export const tools = [
  {
    id: "json-converter",
    name: "JSON转换",
    description: "JSON压缩、格式化、转义和反转义",
    category: "格式化",
    component: "JsonConverter",
  },
  {
    id: "timestamp-generator",
    name: "时间戳生成",
    description: "生成当前时间戳，支持多种格式",
    category: "时间",
    component: "TimestampGenerator",
  },
  {
    id: "qr-generator",
    name: "二维码生成",
    description: "将链接或文本转换为二维码",
    category: "编码",
    component: "QrCodeGenerator",
  },
  {
    id: "base64-tool",
    name: "Base64编码",
    description: "Base64编码和解码工具",
    category: "编码",
    component: "Base64EncoderDecoder",
  },
  {
    id: "hash-generator",
    name: "Hash生成器",
    description: "生成MD5、SHA1、SHA256、SHA512哈希",
    category: "编码",
    component: "HashGenerator",
  },
  {
    id: "color-converter",
    name: "颜色转换",
    description: "HEX、RGB、HSL颜色格式互转",
    category: "转换",
    component: "ColorConverter",
  },
  {
    id: "uuid-generator",
    name: "UUID生成器",
    description: "生成UUID v4，支持单个和批量生成",
    category: "生成器",
    component: "UuidGenerator",
  },
];

export const categories = ["全部", "格式化", "时间", "编码", "转换", "生成器"];
