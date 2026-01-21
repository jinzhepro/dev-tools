/**
 * @file useCopyClipboard.js
 * @description 复制到剪贴板的 Hook，提供复制功能和成功提示
 */

import { useCallback } from "react";
import { toast } from "sonner";

/**
 * 复制到剪贴板的 Hook
 * @returns {Object} copy - 复制函数
 * 
 * @example
 * const { copy } = useCopyClipboard();
 * copy("要复制的内容");
 * copy("要复制的内容", "自定义提示文本");
 */
export function useCopyClipboard() {
  /**
   * 复制文本到剪贴板
   * @param {string} text - 要复制的文本
   * @param {string} [label] - 可选的标签，用于提示信息
   */
  const copy = useCallback((text, label) => {
    if (!text) {
      toast.error("没有可复制的内容");
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      toast.success(label ? `已复制 ${label} 到剪贴板` : "已复制到剪贴板");
    }).catch(() => {
      toast.error("复制失败，请手动选择文本复制");
    });
  }, []);

  return { copy };
}
