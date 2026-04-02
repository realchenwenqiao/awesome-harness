import { useLanguage } from '../contexts/LanguageContext';
import { translations } from './translations';

/**
 * 翻译 Hook
 * 提供 t() 函数用于获取当前语言的翻译文本
 *
 * 使用示例:
 * const { t } = useTranslations();
 * t('home.hero.title') // 返回对应语言的标题
 * t('home.results.found', { count: 10 }) // 支持参数替换
 */
export function useTranslations() {
  const { language } = useLanguage();

  /**
   * 获取翻译文本
   * @param {string} key - 翻译键，使用点号分隔的路径，如 'home.hero.title'
   * @param {Object} params - 可选的参数对象，用于替换模板变量 {{key}}
   * @returns {string} 翻译后的文本
   */
  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = translations[language];

    // 尝试获取当前语言的翻译
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // 如果当前语言没有该 key，回退到中文
        value = translations['zh'];
        for (const fallbackKey of keys) {
          if (value && value[fallbackKey] !== undefined) {
            value = value[fallbackKey];
          } else {
            // 如果中文也没有，返回 key 本身作为最后的 fallback
            return key;
          }
        }
        break;
      }
    }

    // 替换参数
    if (typeof value === 'string') {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : match;
      });
    }

    return value;
  };

  return { t, language };
}
