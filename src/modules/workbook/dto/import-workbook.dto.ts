import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CustomData,
  IStyleData,
  IWorkbookData,
  IWorksheetData,
  Nullable,
} from '@univerjs/core';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ResourceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  data: string;
}

export enum LocaleType {
  EN_US = 'enUS',
  FR_FR = 'frFR',
  ZH_CN = 'zhCN',
  RU_RU = 'ruRU',
  ZH_TW = 'zhTW',
  VI_VN = 'viVN',
  FA_IR = 'faIR',
  KO_KR = 'koKR',
  ES_ES = 'esES',
  CA_ES = 'caES',
}

export class ImportWorkbookDto implements IWorkbookData {
  @ApiProperty({
    description: 'The id of the workbook',
    example: 'gyI0JO',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The name of the workbook',
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The app version of the workbook',
    example: '0.10.2',
  })
  @IsNotEmpty()
  @IsString()
  appVersion: string;

  @ApiProperty({
    description: 'The locale of the workbook',
    example: 'enUS',
  })
  @IsNotEmpty()
  @IsEnum(LocaleType)
  locale: LocaleType;

  @ApiProperty({
    description: 'The styles of the workbook',
    example: {},
  })
  @IsNotEmpty()
  @IsObject()
  styles: Record<string, Nullable<IStyleData>>;

  @ApiProperty({
    description: 'The sheet order of the workbook',
    example: ['RSfWjJFv4opmE1JaiRj80'],
  })
  @IsNotEmpty()
  @IsArray()
  sheetOrder: string[];

  @ApiProperty({
    description: 'The sheets of the workbook',
    example: {
      RSfWjJFv4opmE1JaiRj80: {
        id: 'RSfWjJFv4opmE1JaiRj80',
        name: 'Test',
        tabColor: '',
        hidden: 0,
        rowCount: 30,
        columnCount: 10,
        zoomRatio: 1,
        freeze: {
          startRow: -1,
          startColumn: -1,
          ySplit: 0,
          xSplit: 0,
        },
        scrollTop: 0,
        scrollLeft: 0,
        defaultColumnWidth: 73,
        defaultRowHeight: 23,
        mergeData: [],
        cellData: {},
        rowData: {},
        columnData: {
          0: { w: 125, hd: 0 },
          1: { w: 125, hd: 0 },
          2: { w: 125, hd: 0 },
          3: { w: 125, hd: 0 },
          4: { w: 125, hd: 0 },
          5: { w: 125, hd: 0 },
          6: { w: 125, hd: 0 },
          7: { w: 125, hd: 0 },
          8: { w: 125, hd: 0 },
          9: { w: 125, hd: 0 },
        },
        showGridlines: 1,
        rowHeader: { width: 46, hidden: 0 },
        columnHeader: { height: 20, hidden: 0 },
        rightToLeft: 0,
      },
    },
  })
  @IsNotEmpty()
  @IsObject()
  sheets: {
    [sheetId: string]: Partial<IWorksheetData>;
  };

  @ApiPropertyOptional({
    description: 'The default style of the workbook',
    example: null,
  })
  @IsOptional()
  @IsObject()
  defaultStyle?: Nullable<IStyleData> | string;

  @ApiPropertyOptional({
    description: 'The resources of the workbook',
    example: [
      {
        name: 'SHEET_DEFINED_NAME_PLUGIN',
        data: '',
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @Type(() => ResourceDto)
  @ValidateNested({ each: true })
  resources?: ResourceDto[];

  @ApiPropertyOptional({
    description: 'The custom of the workbook',
    example: {},
  })
  @IsOptional()
  @IsObject()
  custom?: CustomData;
}
