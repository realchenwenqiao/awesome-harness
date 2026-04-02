import { useState } from 'react';
import { useTranslations } from '../i18n/useTranslations';

function SubmitProject({ onClose }) {
  const { t } = useTranslations();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // 验证 URL 格式
      const urlPattern = /^https:\/\/github\.com\/([a-zA-Z0-9_-]+)(\/[a-zA-Z0-9_-]*)?$/;
      if (!urlPattern.test(url)) {
        throw new Error(t('submitProject.errors.invalidUrl'));
      }

      // 打开 GitHub Issues 页面并预填充内容
      const encodedUrl = encodeURIComponent(url);
      const title = encodeURIComponent(t('submitProject.issue.title'));
      const body = encodeURIComponent(t('submitProject.issue.body', { url }));
      const issuesUrl = `https://github.com/realchenwenqiao/awesome-harness/issues/new?title=${title}&body=${body}`;

      window.open(issuesUrl, '_blank');

      setSuccess(t('submitProject.success.message'));
      setTimeout(() => {
        onClose();
      }, 2000);

      setUrl('');
    } catch (err) {
      setError(err.message || t('submitProject.errors.submitFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('submitProject.modal.title')}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('submitProject.form.urlLabel')}
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t('submitProject.form.urlPlaceholder')}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-all disabled:opacity-50"
            >
              {loading ? t('common.submitting') : t('common.submit')}
            </button>
          </div>
        </form>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          <p>{t('submitProject.help.title')}</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>{t('submitProject.help.format1')}</li>
            <li>{t('submitProject.help.format2')}</li>
          </ul>
          <p className="mt-2">{t('submitProject.help.note')}</p>
        </div>
      </div>
    </div>
  );
}

export default SubmitProject;
