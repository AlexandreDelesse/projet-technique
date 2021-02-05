<?php

namespace App\Http\Helpers;

use Exception;
use Illuminate\Support\Facades\Http;

class Kong 
{    
    /**
     * Kong base url;
     * @var Illuminate\Support\Facades\Http
     */
    const KONG_URL = "http://kong:8001";
    
    /**
     * Get consumers
     *
     * @return Illuminate\Http\Response
     */
    public static function consumers() {
        
        return Http::get(self::KONG_URL . '/consumers');
    }
    
    /**
     * Create a new consumer
     *
     * @return Illuminate\Http\Client\Response
     */
    public static function createConsumer(string $username, string $custom_id) {
        if($response = self::consumerExists($username)) {
            return $response;
        }
        $data = [
            'username' => $username,
            'custom_id' => $custom_id
        ];
 
        $response =  Http::post(self::KONG_URL . '/consumers', $data);

        if($response->status() === 201) {
            return $response;
        }

        throw new Exception('Can\'t generate consumer ' . $username . '.');
    }
    
    /**
     * Check if a consumer already exist
     *
     * @param  string $username
     * @return Illuminate\Http\Client\Response|bool
     */
    public static function consumerExists(string $username) {
        $response = Http::get(self::KONG_URL . '/consumers/' . $username);
        return $response->status() === 200 ? $response : false;
    }
    
    /**
     * Generate a key for a consumer
     *
     * @param  string $username
     * @throws Exception if request fails.
     * @return Illuminate\Http\Client\Response
     */
    public static function generatekey(string $username) {
        $response = Http::post(self::KONG_URL . '/consumers/' . $username . '/key-auth');
        if ($response->status() === 201) {
            return $response;
        }
        throw new Exception('Can\'t generate key for consumer ' . $username . '.');
    }
    
    /**
     * Delete a consumer.
     *
     * @param  string $username
     * @throws Exception if request fails.
     * @return Illuminate\Http\Client\Response
     */
    public static function deleteConsumer(string $username) {
        $response = Http::delete(self::KONG_URL . '/consumers/' . $username);
        switch($response->status()) {
            case 204: return $response;
            case 404: throw new Exception('Consumer ' . $username . ' doesn\'t exist.');
            default: throw new Exception('Can\'t delete consumer ' . $username . '.');
        }
    }
}