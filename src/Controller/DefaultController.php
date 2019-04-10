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
        $orders = $this->getPretixOrders();

        $ticketsGross = 0;
        $ticketsNet = 0;

        foreach ($orders as $order) {
            $payment = $order['payments'][0];
            $total = floatval($order['total']);
            $ticketsGross += $total;

            switch ($payment['provider']) {
                case 'paypal':
                    $ticketsNet += $total - 0.35 - ($total * 0.0249);
                    break;
                case 'stripe':
                    $ticketsNet += $total - 0.25 - ($total * 0.014);
                    break;
            }
        }

        $ticketsNet = round($ticketsNet, 2);
        $doors = 4532.71;
        $donations = 20;
        $income = $ticketsNet + $doors + $donations;

        $booking = 856 + 192.69 + 156.29 + 600 + 547 + 140.2;
        $promo = 105;
        $print = 62.21 + 57.77;
        $catering = 139.00 + 124.54 + 357.33;
        $staff = 1227.50;
        $extras = 52.99 + 200 + 50 + 96;
        $rent = 308.88;

        $expenses = $booking + $print + $promo + $extras + $catering + $staff + $rent;

        $profit = -$expenses + $income;

        return $this->render(
            'numbers.html.twig',
            [
                'booking' => $booking,
                'promo' => $promo,
                'print' => $print,
                'catering' => $catering,
                'extras' => $extras,
                'staff' => $staff,
                'rent' => $rent,
                'ticketsGross' => $ticketsGross,
                'ticketsNet' => $ticketsNet,
                'doors' => $doors,
                'donations' => $donations,
                'expenses' => $expenses,
                'income' => $income,
                'profit' => $profit,
            ]
        );
    }

    /**
     * @Route("/statistik", name="numbers")
     */
    public function stats()
    {
        return $this->render(
            'stats.html.twig',
            []
        );
    }

    /**
     * @return array
     * @throws \Exception
     */
    private function getPretixOrders(): array
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

            $query = $next ?? $base.$path.'?'.http_build_query(
                    [
                        'status' => 'p',
                    ]
                );

            curl_setopt($curl, CURLOPT_URL, $query);

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

        return $orders;
    }
}
