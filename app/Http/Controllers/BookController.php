<?php
/*
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class BookController extends Controller
{
    public function fetchBooks(Request $request)
    {
        $list = $request->query('list', 'e-book-fiction');
        $offset = $request->query('offset', 40);
        $apiKey = "RVl5oNcQUfm0SNZL0fjde6qnysH6NqF6";

        $url = "https://api.nytimes.com/svc/books/v3/lists.json?list=$list&offset=$offset&api-key=$apiKey";

        $response = Http::get($url);

        return $response->json();
    }
}
*/
