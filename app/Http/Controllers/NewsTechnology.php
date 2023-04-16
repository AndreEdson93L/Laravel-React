<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Models\News;

class NewsTechnology extends Controller
{
    public function fetchTechnologyNews(Request $request)
    {
        $client = new Client();
        $apiKey = '00d3b42d7c444ec9bd4f6577e4aa6b59';
        $url = "https://newsapi.org/v2/top-headlines?country=de&category=technology&apiKey={$apiKey}";

        $keyword = $request->input('keyword');

        if (!empty($keyword)) {
            $url .= "&q=" . urlencode($keyword);
        }

        $response = $client->get($url);
        $data = json_decode($response->getBody(), true);

        //dd($data);

        // Iterate over each article and store it in the database
        foreach ($data['articles'] as $article) {
             // Truncate the 'url_to_image' value to a maximum of 2047 characters
             $truncatedUrlToImage = Str::limit($article['urlToImage'], 2047);

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