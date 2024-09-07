import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors(corsOptions);

  app.use(
    session({
      secret: 'myeofkseijkijsecret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000000 }, // Adjust secure based on your environment
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // app.use((req, res, next) => {
  //   console.log('Session:', req.session);
  //   console.log('User:', req.user);
  //   next();
  // });
  await app.listen(3001);
}
bootstrap();
