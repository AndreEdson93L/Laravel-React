<?php

namespace App\Http\Controllers\NewsApi;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Models\News;

class NewsSport extends Controller
{
    public function fetchSportNews(Request $request)
    {
        $client = new Client();
        $apiKey = config('api_keys.open_news');
        $url = "https://newsapi.org/v2/top-headlines?country=us&category=sport&apiKey={$apiKey}";

        $keyword = $request->input('keyword');

        if (!empty($keyword)) {
            $url .= "&q=" . urlencode($keyword);
        }

        $response = $client->get($url);
        $data = json_decode($response->getBody(), true);

        //dd($data);

        // Iterate over each article and store it in the database
        foreach ($data['articles'] as $article) {
            $parsedUrl = parse_url($article['urlToImage']);
            $queryParams = [];
            parse_str($parsedUrl['query'] ?? '', $queryParams);

            // Remove unnecessary query parameters
            unset($queryParams['width'], $queryParams['height'], $queryParams['auto'], $queryParams['overlay-align'], $queryParams['overlay-width'], $queryParams['overlay-base64'], $queryParams['enable']);

            // Rebuild the URL
            $scheme = isset($parsedUrl['scheme']) ? $parsedUrl['scheme'] . '://' : '';
            $host = $parsedUrl['host'] ?? '';
            $path = $parsedUrl['path'] ?? '';

            $cleanUrl = $scheme . $host . $path . '?' . http_build_query($queryParams);
            $truncatedUrlToImage = Str::limit($cleanUrl, 2047);

            //dd($truncatedUrlToImage);

            if (strlen($article['urlToImage']) > 2047) {
                echo "Problematic URL: " . $article['urlToImage'] . "\n";
            }

            News::create([
                'source_id' => $article['source']['id'],
                'source_name' => $article['source']['name'],
                'author' => $article['author'],
                'title' => $article['title'],
                'description' => $article['description'],
                'url' => $article['url'],
                'url_to_image' => $truncatedUrlToImage,
                'published_at' => $article['publishedAt'],
                'content' => $article['content'],
            ]);
        }

        return response()->json($data);
    }
}