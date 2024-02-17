import React, { useState, useEffect } from 'react';

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://api.marketaux.com/v1/news/all?symbols=TSLA%2CAMZN%2CMSFT&filter_entities=true&language=en&api_token=R183rNHdFNhruO1u478qBYaNTuQnxXhyCAAtHqgc');
        const data = await response.json();
        setArticles(data.data.slice(0,  5)); // Get the first  4 articles
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">News</h1>
      {articles.map((article, index) => (
        <div key={article.uuid} className="mb-4 p-4 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
          <p className="text-gray-700 mb-2">{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">Read More</a>
          {index <  3 && <hr className="my-4" />}
        </div>
      ))}
    </div>
  );
};

export default News;
