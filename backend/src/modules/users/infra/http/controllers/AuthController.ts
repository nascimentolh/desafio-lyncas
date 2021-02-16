import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { verify } from 'jsonwebtoken';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class AuthController {
  public async authenticate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, access_token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user: user, access_token });
  }

  public async validate(request: Request, response: Response): Promise<Response> {
    return response.json(true);
  }
}
