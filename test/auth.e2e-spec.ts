import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { disconnect } from "mongoose";
import * as request from 'supertest';

import { AppModule } from "../src/app.module";
import { AuthDto } from "../src/auth/dto/auth.dto";

const loginDto: AuthDto = {
	login: 'test@gmal.com',
	password: '123456'
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
  });

  it('/auth/login (POST) - success', async done => {
	return request(app.getHttpServer())
		.post('/auth/login')
		.send(loginDto)
		.expect(200)
		.then(({ body }: request.Response) => {
			expect(body.access_token).toBeDefined();
			done();
		});
  });

  it('/auth/login (POST) - fail password', async () => {
	return request(app.getHttpServer())
		.post('/auth/login')
		.send({ ...loginDto, password: '1' })
		.expect(401, {
			statusCode: 401,
			message: "Неверный пароль",
			error: "Unauthorized"
		})
  });

  it('/auth/login (POST) - fail login', async () => {
	return request(app.getHttpServer())
		.post('/auth/login')
		.send({ ...loginDto, login: 't@gmail.com' })
		.expect(401, {
			statusCode: 401,
			message: "Пользователь с таким логином не найден",
			error: "Unauthorized"
		})
  });

  afterAll(() => {
  	disconnect();
	});
});
