import { PutProductDto } from "./put.product.dto";

export interface PatchProductDto extends Partial<PutProductDto> {}