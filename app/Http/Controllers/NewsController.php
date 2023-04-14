<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Models\News;

class NewsController extends Controller
{
    public function fetchNews()
    {
        $client = new Client();
        $apiKey = '00d3b42d7c444ec9bd4f6577e4aa6b59';
        $url = "https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey={$apiKey}";

        $response = $client->get($url);
        $data = json_decode($response->getBody(), true);

        dd($data);

        // Iterate over each article and store it in the database
        foreach ($data['articles'] as $article) {
            News::create([
                'source_id' => $article['source']['id'],
                'source_name' => $article['source']['name'],
                'author' => $article['author'],
                'title' => $article['title'],
                'description' => $article['description'],
                'url' => $article['url'],
                'url_to_image' => $article['urlToImage'],
                'published_at' => $article['publishedAt'],
                'content' => $article['content'],
            ]);
        }
    }
}