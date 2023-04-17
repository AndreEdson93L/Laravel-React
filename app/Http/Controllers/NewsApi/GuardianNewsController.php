<?php

namespace App\Http\Controllers\NewsApi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Models\GuardianNews;

class GuardianNewsController extends Controller
{
    public function fetchGuardiansNews(Request $request)
    {
        $client = new Client();
        $apiKey = config('guardian.api_key');
        $url = "https://content.guardianapis.com/search?tag=environment/recycling&api-key={$apiKey}";

        $keyword = $request->input('keyword');

        if (!empty($keyword)) {
            $url .= "&q=" . urlencode($keyword);
        }

        $response = $client->get($url);
        $data = json_decode($response->getBody(), true);

        // Iterate over each article and store it in the database
        foreach ($data['response']['results'] as $article) {
            GuardianNews::create([
                'article_id' => $article['id'],
                'section_id' => $article['sectionId'],
                'section_name' => $article['sectionName'],
                'web_publication_date' => $article['webPublicationDate'],
                'web_title' => $article['webTitle'],
                'web_url' => $article['webUrl'],
                'api_url' => $article['apiUrl'],
                'is_hosted' => $article['isHosted'],
                'pillar_id' => $article['pillarId'] ?? null,
                'pillar_name' => $article['pillarName'] ?? null,
            ]);
        }

        return response()->json($data); // Return the data as JSON
    }
}
