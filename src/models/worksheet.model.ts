import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  BooleanNumber,
  ICellData,
  IColumnData,
  IFreeze,
  IObjectArrayPrimitiveType,
  IObjectMatrixPrimitiveType,
  IRange,
  IRowData,
  IStyleData,
} from '@univerjs/core';
import { HydratedDocument, Types } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { WorkbookVersion } from './workbook-version.model';
import { Workbook } from './workbook.model';

export type WorksheetDocument = HydratedDocument<Worksheet>;

@Schema({ timestamps: true, collection: 'worksheets' })
export class Worksheet {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id?: Types.ObjectId;

  @Prop({ type: String, required: true })
  univerWorksheetId: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  tabColor?: string;

  @Prop({ type: Number, required: false })
  hidden?: BooleanNumber;

  @Prop({ type: Object, required: false })
  freeze?: IFreeze;

  @Prop({ type: Number, required: false })
  rowCount?: number;

  @Prop({ type: Number })
  columnCount?: number;

  @Prop({ type: Number, required: false })
  defaultColumnWidth?: number;

  @Prop({ type: Number, required: false })
  defaultRowHeight?: number;

  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  mergeData?: IRange[];

  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  cellData?: IObjectMatrixPrimitiveType<ICellData>;

  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  rowData?: IObjectArrayPrimitiveType<Partial<IRowData>>;

  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  columnData?: IObjectArrayPrimitiveType<Partial<IColumnData>>;

  @Prop({ type: Object, required: false })
  rowHeader?: { width: number; hidden?: BooleanNumber };

  @Prop({ type: Object, required: false })
  columnHeader?: { height: number; hidden?: BooleanNumber };

  @Prop({ type: Number, required: false })
  showGridlines?: BooleanNumber;

  @Prop({ type: Number, required: false })
  rightToLeft?: BooleanNumber;

  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  defaultStyle?: IStyleData;

  @Prop({ type: Types.ObjectId, ref: 'Workbook', required: true })
  workbook: Workbook;

  @Prop({ type: Types.ObjectId, ref: 'WorkbookVersion', required: true })
  workbookVersion: WorkbookVersion;
}
export const WorksheetSchema = SchemaFactory.createForClass(Worksheet);

WorksheetSchema.index(
  { workbook: 1, univerWorksheetId: 1, workbookVersion: 1 },
  { unique: true },
);
