<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{

    /**
     * @Route("/", name="index")
     * @param \Symfony\Component\HttpKernel\KernelInterface $kernel
     *
     */
    public function index(KernelInterface $kernel): Response
    {
        $projectDir = $kernel->getProjectDir();
        $finder     = new Finder();
        $finder->files()->in("$projectDir/public/images/photos");

        $projectDirLength = strlen("$projectDir/public");
        $photos           = [];
        foreach ($finder as $index => $photo) {
            $photo          = substr($photo, $projectDirLength);
            $photos[$index] = $photo;
        }

        $videos = [
            'https://www.youtube.com/embed/cfcC-VrsYJA',
        ];

        return $this->render(
            'index.html.twig',
            [
                'photos' => $photos,
                'videos' => $videos,
            ]
        );
    }

    /**
     * @Route("/zahlen", name="numbers")
     * @throws \Exception
     */
    public function numbers(): Response
    {
        $ticketsNet   = 2396.06;
        $ticketsGross = $ticketsNet + 7.95 + 75.83;

        $ticketsNet = round($ticketsNet, 2);
        $doors      = 4532.71;
        $donations  = 20;
        $income     = $ticketsNet + $doors + $donations;

        $booking  = 856 + 192.69 + 156.29 + 600 + 547 + 140.2;
        $promo    = 105;
        $print    = 62.21 + 57.77;
        $catering = 139.00 + 124.54 + 357.33;
        $staff    = 1227.50;
        $extras   = 52.99 + 200 + 50 + 96;
        $rent     = 308.88;

        $expenses = $booking + $print + $promo + $extras + $catering + $staff + $rent;

        $profit = -$expenses + $income;

        return $this->render(
            'numbers.html.twig',
            [
                'booking'      => $booking,
                'promo'        => $promo,
                'print'        => $print,
                'catering'     => $catering,
                'extras'       => $extras,
                'staff'        => $staff,
                'rent'         => $rent,
                'ticketsGross' => $ticketsGross,
                'ticketsNet'   => $ticketsNet,
                'doors'        => $doors,
                'donations'    => $donations,
                'expenses'     => $expenses,
                'income'       => $income,
                'profit'       => $profit,
            ]
        );
    }

    /**
     * @Route("/statistik", name="stats")
     */
    public function stats(): Response
    {
        return $this->render(
            'stats.html.twig',
            []
        );
    }
}
