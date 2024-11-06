<?php

namespace App\Providers;

use App\Jobs\TaskExpirationJob;
use App\Models\Task;
use App\Policies\TaskPolicy;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }

    protected $policies = [
        Task::class => TaskPolicy::class,
    ];


}
