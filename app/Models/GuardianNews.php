<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuardianNews extends Model
{
    use HasFactory;

    protected $fillable = [
        'article_id',
        'section_id',
        'section_name',
        'web_publication',
        'web_publication_date',
        'web_title',
        'web_url',
        'api_url',
        'is_hosted',
        'pillar_id',
        'pillar_name',
    ];

    protected $table = 'guardian_news';
}
