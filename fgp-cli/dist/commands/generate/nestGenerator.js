"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNestResource = generateNestResource;
// src/commands/generate/nestGenerator.ts
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function generateNestResource(crudName, folderName) {
    const targetDir = path.join(process.cwd(), folderName);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    const files = {
        [`${crudName}.service.ts`]: `import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class ${capitalize(crudName)}Service {\n  private items: any[] = [];\n\n  findAll() {\n    return this.items;\n  }\n\n  findOne(id: number) {\n    return this.items.find(item => item.id === id);\n  }\n\n  create(data: any) {\n    const newItem = { id: Date.now(), ...data };\n    this.items.push(newItem);\n    return newItem;\n  }\n\n  update(id: number, data: any) {\n    const index = this.items.findIndex(item => item.id === id);\n    if (index !== -1) {\n      this.items[index] = { ...this.items[index], ...data };\n      return this.items[index];\n    }\n    return null;\n  }\n\n  remove(id: number) {\n    const index = this.items.findIndex(item => item.id === id);\n    if (index !== -1) {\n      const removed = this.items.splice(index, 1);\n      return removed[0];\n    }\n    return null;\n  }\n}`,
        [`${crudName}.controller.ts`]: `import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';\nimport { ${capitalize(crudName)}Service } from './${crudName}.service';\n\n@Controller('${crudName}')\nexport class ${capitalize(crudName)}Controller {\n  constructor(private readonly ${crudName}Service: ${capitalize(crudName)}Service) {}\n\n  @Get()\n  findAll() {\n    return this.${crudName}Service.findAll();\n  }\n\n  @Get(':id')\n  findOne(@Param('id') id: number) {\n    return this.${crudName}Service.findOne(id);\n  }\n\n  @Post()\n  create(@Body() data: any) {\n    return this.${crudName}Service.create(data);\n  }\n\n  @Put(':id')\n  update(@Param('id') id: number, @Body() data: any) {\n    return this.${crudName}Service.update(id, data);\n  }\n\n  @Delete(':id')\n  remove(@Param('id') id: number) {\n    return this.${crudName}Service.remove(id);\n  }\n}`,
        [`${crudName}.module.ts`]: `import { Module } from '@nestjs/common';\nimport { ${capitalize(crudName)}Service } from './${crudName}.service';\nimport { ${capitalize(crudName)}Controller } from './${crudName}.controller';\n\n@Module({\n  controllers: [${capitalize(crudName)}Controller],\n  providers: [${capitalize(crudName)}Service],\n})\nexport class ${capitalize(crudName)}Module {}`,
        [`${crudName}.entity.ts`]: `import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';\n\n@Entity('${crudName}')\nexport class ${capitalize(crudName)} {\n  @PrimaryGeneratedColumn()\n  id: number;\n\n  @Column()\n  name: string;\n\n  @Column({ type: 'text', nullable: true })\n  description?: string;\n}`,
        [`dto/create-${crudName}.dto.ts`]: `export class Create${capitalize(crudName)}Dto {\n  readonly name: string;\n  readonly description?: string;\n}`,
        [`dto/update-${crudName}.dto.ts`]: `export class Update${capitalize(crudName)}Dto {\n  readonly name?: string;\n  readonly description?: string;\n}`,
    };
    for (const [fileName, content] of Object.entries(files)) {
        const filePath = path.join(targetDir, fileName);
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, content, 'utf8');
    }
    console.log(`NestJS CRUD '${crudName}' with entity and DTOs generated successfully in ${targetDir}`);
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
