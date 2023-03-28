## Silkpay

# Basic Information

-   Project name：SilkPay
-   smart contract repository: https://github.com/TecSong/SilkPay
-   smart contract deploy:

    -   scroll alpha testnet:
        SilkArbitrator 0x47D7F6B196a58e08B70cfc7066901faca9863e52
        SilkPayV1 0x6dD245E5bAcfdE61C3D49f7d5C94FF8E68faa137

    -   chiado (gnosis testnet)：
        SilkArbitrator 0xAd8efd46bE9E93dbB4B416FcDDE022fD11a61016
        SilkPayV1 0x105F08898ec90e55d8f9C05EAfE5DA44180fB136

    -   Bedrock (op testnet):
        SilkArbitrator 0xa70225Cb7f1B9d73cd09920fAf4ed76d150bF762
        SilkPayV1 0x0dc627cB3bB1319007A5500259e8A16e672d8328

    -   sepolia (taiko testnet):
        SilkArbitrator 0xAd8efd46bE9E93dbB4B416FcDDE022fD11a61016
        SilkPayV1 0x105F08898ec90e55d8f9C05EAfE5DA44180fB136

    -   zkEVM (polygon testnet):
        SilkArbitrator 0xad8efd46be9e93dbb4b416fcdde022fd11a61016
        SilkPayV1 0x105f08898ec90e55d8f9c05eafe5da44180fb136

    -   mantle testnet:
        SilkArbitrator [0x809e2c3C7ac9e5D8D1499f41644200d11780497a](https://explorer.testnet.mantle.xyz/address/0x809e2c3C7ac9e5D8D1499f41644200d11780497a)
        SilkPayV1 [0xaB3ed5B7ba4f8ef1972a8b1b167C46e8ae5E82e0](https://explorer.testnet.mantle.xyz/address/0xaB3ed5B7ba4f8ef1972a8b1b167C46e8ae5E82e0)

# Project Description

An arbitrable payment protocol on L2
![image](https://user-images.githubusercontent.com/8627464/227238947-879c85e1-a48b-4860-81a1-06d217943a5a.png)

# Vision and Mission

SilkPay is a payment protocol on L2, which aims to solve problems in various payment scenarios on the basis of low cost and high efficiency solutions, including prepayment, regular payment, and credit payment. We also introduce an arbitration mechanism to resolve payment disputes, and we will also use zk technology to protect privacy during payment and arbitration in the future.

# Advantages

-   Uniqueness:
    -   We create a universal platform for advance payment, arbitration and split payment.
    -   Embedded Zero Knowledge proof tools to make sure court evidence upon submission is kept secret.
    -   During voting, we also keep all onchain users anonymous by using ZK technology.
    -   Also we use L2 to leverage our platform to complex computation more affordable.
-   Efficiency:
    -   By using pre-payment protocols, we bundle up transactions into batches to save gas fees.
-   Security:
    -   We set the payment amount and whitelist receivers ahead of time before the payment is triggered, to prevent loss of funds.

# How it works

-   ![flow](https://user-images.githubusercontent.com/8627464/227718733-1b894dd0-63bc-4fc1-97e6-15350faa4e5b.jpg)

# Application Scenario

-   payments in DAOs, such as the payment of remuneration
-   payments in hackathons, such as designating the winner among the contestants and paying out the prize money
-   and so on

# Functions completed during hackathon delivery

-   [ ] **Complete the logic of pre-payment**
-   [ ] **Complete the logic of the arbitration mechanism**

# Further Improvements

-   [ ] **Implement the logic for spliting bills**
-   [ ] **Support batch payment and more ERC20 token payment**
-   [ ] **Use ZK technology to protect the privacy of payment and arbitration**

# See More

-   video demo:
-   project deck:
