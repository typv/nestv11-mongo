import { applyDecorators, UseGuards } from '@nestjs/common';
import { Public } from './public.decorator';
import { RefreshTokenGuard } from 'src/guards';

export const RefreshToken = () => applyDecorators(Public(), UseGuards(RefreshTokenGuard));
