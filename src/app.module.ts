import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import * as Joi from 'joi';
import { SurveysModule } from './surveys/surveys.module';
import { AnswerSheetsModule } from './answer-sheets/answer-sheets.module';
import configuration from './config/configuration';
import { join } from 'path';
// import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

type httpError = {
  error: string;
  message?: string;
  statusCode: number;
};

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
      includeStacktraceInErrorResponses: false,
      autoTransformHttpErrors: true,
      formatError: (formattedError) => {
        // Expected error
        if (formattedError instanceof GraphQLError) {
          const httpError = formattedError.extensions
            .originalError as httpError;

          return {
            code: httpError.error,
            message: httpError.message,
            statusCode: httpError.statusCode,
          };
        }

        // Error filtered by Field Decorator
        if (
          formattedError.extensions?.code === 'BAD_USER_INPUT' ||
          formattedError.extensions?.code === 'GRAPHQL_VALIDATION_FAILED'
        ) {
          return {
            code: formattedError.extensions?.code,
            message: formattedError.message,
            statusCode: 422,
          };
        }

        // Unexpected Error
        return {
          code: formattedError.extensions?.code,
          message: formattedError.message,
        };
      },
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env'],
      // envFilePath:
      //   process.env.NODE_ENV === 'dev' ? ['.env.dev.local'] : ['.env'],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').default('dev'),
      }),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.name'),
          autoLoadEntities: true,
          synchronize: process.env.NODE_ENV !== 'prod',
          logging: ['error'],
        };
      },
      inject: [ConfigService],
    }),
    SurveysModule,
    AnswerSheetsModule,
  ],
})
export class AppModule {}
