import { useState } from 'react';

function SubmitProject({ onClose }) {
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
        throw new Error('请输入有效的 GitHub 链接');
      }

      // 打开 GitHub Issues 页面并预填充内容
      const encodedUrl = encodeURIComponent(url);
      const title = encodeURIComponent('提交 GitHub 项目');
      const body = encodeURIComponent(`我想要提交以下 GitHub 项目/组织：\n${url}\n\n请将其添加到网站中。`);
      const issuesUrl = `https://github.com/realchenwenqiao/awesome-cnbigcompany-hub/issues/new?title=${title}&body=${body}`;
      
      window.open(issuesUrl, '_blank');
      
      setSuccess('已打开 GitHub Issues 页面，请提交你的请求！');
      setTimeout(() => {
        onClose(); // 自动关闭弹窗
      }, 2000);
      
      setUrl('');
    } catch (err) {
      setError(err.message || '提交失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">提交 GitHub 项目</h2>
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
              GitHub 链接
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/username 或 https://github.com/username/repository"
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
              取消
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-all disabled:opacity-50"
            >
              {loading ? '提交中...' : '提交'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          <p>支持以下格式：</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>https://github.com/username (用户/组织主页)</li>
            <li>https://github.com/username/repository (具体仓库)</li>
          </ul>
          <p className="mt-2">提交后，管理员会审核并将其添加到网站中。</p>
        </div>
      </div>
    </div>
  );
}

export default SubmitProject;
