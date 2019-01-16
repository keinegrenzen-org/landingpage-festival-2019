<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends Controller
{

    /**
     * @Route("/", name="index")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function index()
    {
        return $this->render(
            'index.html.twig'
        );
    }

    /**
     * @Route("/zahlen", name="numbers")
     * @throws \Exception
     */
    public function numbers()
    {
        $auth = 'Token '.$_SERVER['PRETIX_TOKEN'];
        $base = 'https://tickets.keinegrenzen.org';
        $path = '/api/v1/organizers/event/events/festival/orders/';

        $headers = array(
            'Accept: application/json',
            "Authorization: $auth",
        );

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        $next = null;
        $orders = [];

        do {

            $query = http_build_query(
                [
                    'page' => $next,
                    'status' => 'p',
                ]
            );

            curl_setopt($curl, CURLOPT_URL, $base.$path.'?'.$query);

            $response = curl_exec($curl);
            $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

            if ($code == 200) {
                $response = json_decode($response, true);
                $next = $response['next'];
                $orders = array_merge($orders, $response['results']);
            } else {
                $response = json_decode($response, true);
                curl_close($curl);
                throw new \Exception($response['detail'], $code);
            }

        } while ($next !== null);

        curl_close($curl);

        $gross = 0;
        $net = 0;

        foreach ($orders as $order) {
            $payment = $order['payments'][0];
            $total = floatval($order['total']);
            $gross += $total;

            switch ($payment['provider']) {
                case 'paypal':
                    $net += $total - 0.35 - ($total * 0.0249);
                    break;
                case 'stripe':
                    $net += $total - 0.25 - ($total * 0.014);
                    break;
            }
        }

        $net = round($net, 2);

        $booking = 856 + 140.34 + 156.29 + 600 + 547 + 140.2;
        $promo = 85;
        $print = 62.21 + 57.77;
        $catering = 139.00 + 124.54;
        $extras = 52.99 + 200;
        $gema = 50;
        $ksk = 'TBA';

        $sum = $booking + $print + $promo + $extras + $catering + $gema;

        return $this->render(
            'numbers.html.twig',
            [
                'booking' => $booking,
                'promo' => $promo,
                'print' => $print,
                'catering' => $catering,
                'extras' => $extras,
                'gema' => $gema,
                'ksk' => $ksk,
                'gross' => $gross,
                'net' => $net,
                'sum' => $sum,
            ]
        );
    }
}
