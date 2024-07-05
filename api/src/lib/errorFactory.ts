import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ERROR_STATUS } from 'src/constants/STATUS';

export const throwErrorFactory = (
  message: string,
  status: keyof typeof ERROR_STATUS,
) => {
  switch (status) {
    case 'BAD_REQUEST':
      return new BadRequestException(message);
    case 'INTERNAL_SERVER_ERROR':
      return new InternalServerErrorException(message);
    case 'FORBIDDEN':
      return new ForbiddenException('Not implemented');
    case 'UNAUTHORIZED':
      return new UnauthorizedException('Not implemented');
    case 'NOT_FOUND':
      return new NotFoundException(message);
    default:
      return new InternalServerErrorException(message);
  }
};
