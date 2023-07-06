import { Component, OnInit } from '@angular/core';
import { CryptoPredictorService } from '../services/crypto-predictor.service';
import { CryptoDataService } from '../services/crypto-data.service';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})
export class CryptoListComponent implements OnInit {
  cryptoData: any[] = [];

  constructor(
    private cryptoPredictorService: CryptoPredictorService,
    private cryptoDataService: CryptoDataService
  ) {}

  ngOnInit(): void {
    this.fetchCryptoData();
  }

  async fetchCryptoData() {
    let data = null;
    data = await this.cryptoDataService.getCryptoData().toPromise();

    if (data) {
      for (const item of data) {
        const prediction = await this.cryptoPredictorService
          .getPrediction(new Date())
          .toPromise();

        this.cryptoData.push({
          symbol: item.symbol,
          price: item.price,
          image: item.image,
          prediction: prediction.predictedPrice
        });
      }
    }
  }

  getRecommendation(currentPrice: number, predictedPrice: number): string {
    const percentageChange = ((predictedPrice - currentPrice) / currentPrice) * 100;

    if (percentageChange > 5) {
      return 'Comprar';
    } else if (percentageChange < -5) {
      return 'Vender';
    } else {
      return 'Mantener';
    }
  }

}
