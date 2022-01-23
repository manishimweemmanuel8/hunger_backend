import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { Role } from '../auth/enum/role.enum';
import { DistrictService } from './district.service';
import { DistrictDTO } from './DTO/district.dto';

@Controller('district')
@UseGuards(AuthGuard('jwt'))
export class DistrictController {
  constructor(
    private districtService: DistrictService,
    private authService: AuthService,
  ) {}

  @Post()
  register(@Body() districtDTO: DistrictDTO, @Request() req): Promise<void> {
    const { name, email, password } = districtDTO;
    const user = req.user;
    const district = this.districtService.register(districtDTO, user);
    const data = {
      username: name,
      email: email,
      role: Role.DISTRICT,
      password: password,
    };
    this.authService.signUp(data);

    return district;
  }

  @Get()
  async show() {
    return await this.districtService.show();
  }

  @Get(':id')
  async read(@Param('id') id: string) {
    return await this.districtService.read(id);
  }

  @Patch(':id')
  async edit(@Param('id') id: string,@Body() districtDTO: DistrictDTO, @Request() req): Promise<void> {
    const { name, email, password } = districtDTO;
    const user = req.user;
    const districtName=await this.districtService.read(id);
    const district = this.districtService.edit(districtDTO, user,id);
    const data = {
      username: name,
      email: email,
      password: password,
      role:Role.DISTRICT,
    };
    this.authService.edit(data,districtName.name);

    return district;
  }
}
