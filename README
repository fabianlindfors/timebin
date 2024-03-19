# Timebin

[Timebin](https://timebin.fabianlindfors.se) is a client-side web app for time-lock encryption. Using Timebin, you can encrypt and share any text which may then only be decrypted after a certain time. This is made possible by the [drand](https://drand.love) distributed randomness beacon and [their implementation of time-lock encryption](https://drand.love/docs/timelock-encryption/).

Some potential use cases (as suggested by [drand](https://drand.love/docs/timelock-encryption/#use-cases)):

- Responsible vulnerability disclosure
- Transfer of assets/password upon death
- Sealed bid auctions
- MEV prevention
- Public turn-based games
- Voting
- Quizzes

Timebin is similar to [Timevault](https://timevault.drand.love) but produces URLs that can be shared directly.

## Self-hosting

Timebin is available on [timebin.fabianlindfors.se](https://timebin.fabianlindfors.se) but can of course also be self-hosted. Start of by cloning the repo and installing the dependencies using:

```bash
npm install
```

Next, run the following to generate the static web app:

```bash
npm run build
```

The full web app is now available as static files in the `dist/` directory and you can serve up those files how ever you like.

## License

Timebin is [MIT licensed](https://github.com/fabianlindfors/timebin/blob/main/LICENSE)
