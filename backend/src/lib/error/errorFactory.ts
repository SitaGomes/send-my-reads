import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ERROR_STATUS } from '../constants/STATUS';

export const throwErrorFactory = (
  message: string,
  status: keyof typeof ERROR_STATUS,
) => {
  switch (status) {
    case 'BAD_REQUEST':
      throw new BadRequestException(message);
    case 'INTERNAL_SERVER_ERROR':
      throw new InternalServerErrorException(message);
    case 'FORBIDDEN':
      throw new ForbiddenException('Not implemented');
    case 'UNAUTHORIZED':
      throw new UnauthorizedException('Not implemented');
    case 'NOT_FOUND':
      throw new NotFoundException(message);
    default:
      throw new InternalServerErrorException(message);
  }
};
