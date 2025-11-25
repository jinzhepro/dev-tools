"use client";

import { useState, useEffect } from "react";

export default function ColorConverter() {
  const [input, setInput] = useState("#ff0000");
  const [inputType, setInputType] = useState("hex");
  const [results, setResults] = useState({});
  const [error, setError] = useState("");

  // 颜色转换函数
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
          a: 1,
        }
      : null;
  };

  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToRgb = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  const parseRgb = (rgbString) => {
    // 支持RGBA格式
    const rgbaMatch = rgbString.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/i
    );
    if (rgbaMatch) {
      return {
        r: parseInt(rgbaMatch[1]),
        g: parseInt(rgbaMatch[2]),
        b: parseInt(rgbaMatch[3]),
        a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
      };
    }
    return null;
  };

  const parseHsl = (hslString) => {
    const match = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/i);
    return match
      ? {
          h: parseInt(match[1]),
          s: parseInt(match[2]),
          l: parseInt(match[3]),
        }
      : null;
  };

  const convertColor = () => {
    if (!input.trim()) {
      setError("请输入颜色值");
      setResults({});
      return;
    }

    try {
      let rgb = null;

      switch (inputType) {
        case "hex":
          rgb = hexToRgb(input);
          if (!rgb) throw new Error("无效的HEX颜色格式");
          break;
        case "rgb":
          rgb = parseRgb(input);
          if (!rgb) throw new Error("无效的RGB/RGBA颜色格式");
          break;
        case "hsl":
          const hsl = parseHsl(input);
          if (!hsl) throw new Error("无效的HSL颜色格式");
          rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
          rgb.a = 1; // HSL不支持alpha
          break;
      }

      if (!rgb) throw new Error("颜色转换失败");

      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

      setResults({
        hex: hex,
        rgb:
          rgb.a < 1
            ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
            : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        rgbValues: rgb,
        hslValues: hsl,
      });
      setError("");
    } catch (err) {
      setError(err.message);
      setResults({});
    }
  };

  useEffect(() => {
    if (input) {
      convertColor();
    }
  }, [input, inputType]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const exampleColors = [
    { name: "红色", value: "#ff0000", type: "hex" },
    { name: "蓝色", value: "#0000ff", type: "hex" },
    { name: "绿色", value: "#00ff00", type: "hex" },
    { name: "白色", value: "#ffffff", type: "hex" },
    { name: "黑色", value: "#000000", type: "hex" },
    { name: "RGB红色", value: "rgb(255, 0, 0)", type: "rgb" },
    { name: "RGBA半透红", value: "rgba(255, 0, 0, 0.5)", type: "rgb" },
    { name: "HSL蓝色", value: "hsl(240, 100%, 50%)", type: "hsl" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          颜色转换
        </h2>
        <p className="text-gray-600">HEX、RGB/RGBA、HSL颜色格式互转</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 输入区域 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            输入颜色
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入颜色值..."
            className="w-full p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono transition-all duration-200"
          />

          {/* 输入类型选择 */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              输入格式
            </label>
            <div className="flex gap-4">
              {[
                { value: "hex", label: "HEX", example: "#ff0000" },
                { value: "rgb", label: "RGB/RGBA", example: "rgb(255, 0, 0)" },
                { value: "hsl", label: "HSL", example: "hsl(0, 100%, 50%)" },
              ].map((type) => (
                <label key={type.value} className="flex items-center">
                  <input
                    type="radio"
                    value={type.value}
                    checked={inputType === type.value}
                    onChange={(e) => setInputType(e.target.value)}
                    className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      {type.label}
                    </div>
                    <div className="text-xs text-gray-500">{type.example}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* 颜色预览 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            颜色预览
          </label>
          <div
            className="flex justify-center items-center h-32 rounded-xl border-2 border-gray-200"
            style={{
              backgroundColor: results.hex || "#f3f4f6",
              opacity: results.rgbValues?.a || 1,
            }}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">🎨</div>
              <div className="text-sm text-gray-600">
                {results.hex ? `HEX: ${results.hex}` : "输入颜色值查看预览"}
                {results.rgbValues?.a < 1 && (
                  <div className="text-xs mt-1">
                    Alpha: {results.rgbValues.a}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 示例按钮 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-800 mb-4">
          示例颜色
        </label>
        <div className="flex flex-wrap gap-3">
          {exampleColors.map((color, index) => (
            <button
              key={index}
              onClick={() => {
                setInput(color.value);
                setInputType(color.type);
              }}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>

      {/* 错误信息 */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* 转换结果 */}
      {Object.keys(results).length > 0 && !error && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">转换结果</h3>
          {[
            { key: "hex", label: "HEX", value: results.hex },
            { key: "rgb", label: "RGB/RGBA", value: results.rgb },
            { key: "hsl", label: "HSL", value: results.hsl },
          ].map((format) => (
            <div
              key={format.key}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-gray-900">
                  {format.label}
                </h4>
                <button
                  onClick={() => copyToClipboard(format.value)}
                  className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  📋 复制
                </button>
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl font-mono text-sm break-all border border-gray-200">
                {format.value}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-2xl mr-2">🌈</span>
          使用说明
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">支持格式</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                • <strong>HEX：</strong>#ff0000, #3366cc
              </li>
              <li>
                • <strong>RGB：</strong>rgb(255, 0, 0)
              </li>
              <li>
                • <strong>RGBA：</strong>rgba(255, 0, 0, 0.5)
              </li>
              <li>
                • <strong>HSL：</strong>hsl(0, 100%, 50%)
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">应用场景</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Web开发颜色调试</li>
              <li>• 设计稿颜色转换</li>
              <li>• CSS样式调整</li>
              <li>• 颜色值标准化</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>💡 提示：</strong>
            RGBA格式包含透明度(alpha)值，HEX和HSL格式会忽略透明度信息。
          </p>
        </div>
      </div>
    </div>
  );
}
