const Cache = require('@11ty/eleventy-cache-assets');

const repos = {
  signature: {
    name: 'Fibonacci Patterns',
    getIcon: () => '📈',
    repo: 'necipsunmaz/fibonacci-patterns',
    tech: ['js', 'typescript', 'html', 'css', 'math'],
  },
  intern: {
    name: 'İlk Angular Projem',
    getIcon: () => '✅',
    repo: 'necipsunmaz/InternTrackingSystem',
    tech: ['nodejs', 'mongodb', 'css', 'angular', 'typescript'],
  },
  velespi: {
    name: '2016 Linux Yaz Kampı Projem',
    getIcon: () => '🚲',
    repo: 'necipsunmaz/velespi',
    tech: ['python', 'html', 'js', 'css'],
  },
  blog: {
    name: 'Bu Web Sitesi!',
    getIcon: () => '💾',
    repo: 'necipsunmaz/necipsunmaz.com',
    tech: ['11ty', 'sass', 'javascript'],
  },
};

const fetchRepo = async (repoKey) => {
  const staticConfig = repos[repoKey];
  const icon = await staticConfig.getIcon();
  const data = await Cache(`https://api.github.com/repos/${staticConfig.repo}`, {
    duration: '1d',
    type: 'json',
  });
  return {
    icon,
    name: staticConfig.name ?? data.name,
    rating: data.stargazers_count,
    description: data.description.endsWith('.') ? data.description : `${data.description}.`,
    url: staticConfig.url ?? data.html_url,
    tech: staticConfig.tech,
  };
};

module.exports = async () => {
  console.log('Fetching GitHub projects...');
  const projects = await Promise.all(Object.keys(repos).map((key) => fetchRepo(key)));
  // Highest rated projects first
  return projects.sort((a, b) => b.rating - a.rating);
};
