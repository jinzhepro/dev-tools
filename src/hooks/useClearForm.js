/**
 * @file useClearForm.js
 * @description 清空表单状态的 Hook，管理多个输入字段的清空操作
 */

import { useCallback } from "react";
import { toast } from "sonner";

/**
 * 清空表单状态的 Hook
 * @param {Object} options - 配置选项
 * @param {string} [options.successMessage="已清空"] - 成功提示信息
 * @returns {Object} clearForm, resetStates - 清空函数和重置函数
 * 
 * @example
 * const { clearForm, resetStates } = useClearForm({
 *   successMessage: "已清空输入内容"
 * });
 * 
 * // 在组件中使用
 * clearForm(); // 清空所有状态
 * resetStates(); // 重置为初始值
 */
export function useClearForm(options = {}) {
  const { successMessage = "已清空" } = options;

  /**
   * 清空所有传入的状态
   * @param {...React.Dispatch<React.SetStateAction<T>>} setStateFns - 多个 setState 函数
   */
  const clearForm = useCallback((...setStateFns) => {
    setStateFns.forEach((setState) => {
      if (typeof setState === "function") {
        // 对于普通值，清空为空值
        setState("");
        // 对于对象类型，清空为空对象
        setState({});
        // 对于数组类型，清空为空数组
        setState([]);
      }
    });
    toast.success(successMessage);
  }, [successMessage]);

  /**
   * 重置状态为初始值
   * @param {...Array<{setState: React.Dispatch<React.SetStateAction<T>>, initialValue: T}>} states - 状态配置数组
   */
  const resetStates = useCallback((...states) => {
    states.forEach(({ setState, initialValue }) => {
      if (setState && typeof setState === "function") {
        setState(initialValue);
      }
    });
    toast.success(successMessage);
  }, [successMessage]);

  return { clearForm, resetStates };
}

/**
 * 简化的表单清空 Hook
 * @param {React.Dispatch<React.SetStateAction<T>>} setInput - 输入框的 setState
 * @param {React.Dispatch<React.SetStateAction<T>>} [setOutput] - 输出框的 setState（可选）
 * @param {React.Dispatch<React.SetStateAction<T>>} [setError] - 错误状态的 setState（可选）
 * @returns {Function} 清空函数
 * 
 * @example
 * const clearAll = useSimpleClearForm(setInput, setOutput, setError);
 * clearAll(); // 清空所有状态
 */
export function useSimpleClearForm(setInput, setOutput, setError) {
  return useCallback(() => {
    if (setInput) setInput("");
    if (setOutput) setOutput("");
    if (setError) setError("");
    toast.success("已清空");
  }, [setInput, setOutput, setError]);
}
