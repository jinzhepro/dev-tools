/**
 * @file useAsyncOperation.js
 * @description 处理异步操作的 Hook，提供加载状态、错误处理和成功提示
 */

import { useState, useCallback } from "react";
import { toast } from "sonner";

/**
 * 处理异步操作的 Hook
 * @param {Object} options - 配置选项
 * @param {string} [options.successMessage] - 成功提示信息
 * @param {string} [options.errorMessage="操作失败"] - 错误提示信息
 * @param {Function} [options.onSuccess] - 成功后的回调函数
 * @param {Function} [options.onError] - 错误后的回调函数
 * @returns {Object} execute, loading, error
 * 
 * @example
 * const { execute, loading, error } = useAsyncOperation({
 *   successMessage: "操作成功",
 *   errorMessage: "操作失败，请重试"
 * });
 * 
 * const result = await execute(async () => {
 *   return await someAsyncOperation();
 * });
 */
export function useAsyncOperation(options = {}) {
  const {
    successMessage,
    errorMessage = "操作失败",
    onSuccess,
    onError,
  } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 执行异步操作
   * @param {Function} asyncFn - 异步函数
   * @returns {Promise<any>} 异步操作的结果
   */
  const execute = useCallback(async (asyncFn) => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFn();
      
      if (successMessage) {
        toast.success(successMessage);
      }
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      setError(err.message || errorMessage);
      toast.error(err.message || errorMessage);
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [successMessage, errorMessage, onSuccess, onError]);

  /**
   * 重置状态
   */
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
  }, []);

  return { execute, loading, error, reset };
}

/**
 * 带输入验证的异步操作 Hook
 * @param {Object} options - 配置选项
 * @param {Function} [options.validate] - 验证函数，返回错误信息或 null
 * @returns {Object} execute, loading, error, setError
 * 
 * @example
 * const { execute, loading, error, setError } = useValidatedAsyncOperation({
 *   validate: (data) => {
 *     if (!data) return "请输入内容";
 *     return null;
 *   }
 * });
 */
export function useValidatedAsyncOperation(options = {}) {
  const { validate } = options;
  const [error, setError] = useState("");

  const asyncOperation = useAsyncOperation(options);

  /**
   * 带验证的执行函数
   * @param {Function} asyncFn - 异步函数
   * @param {any} [data] - 要验证的数据
   * @returns {Promise<any>} 异步操作的结果
   */
  const execute = useCallback(async (asyncFn, data) => {
    if (validate) {
      const validationError = validate(data);
      if (validationError) {
        setError(validationError);
        toast.error(validationError);
        return;
      }
    }
    
    setError("");
    return asyncOperation.execute(asyncFn);
  }, [validate, asyncOperation]);

  return { ...asyncOperation, execute, error, setError };
}
