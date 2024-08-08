# Enigma

https://enigma-ashy.vercel.app/

Enigma is a password manager designed for private use by a small group of friends and myself. It's not a public product.

## Preview

https://enigma-ashy.vercel.app/

A demo version is available on a separate GitHub branch.

To explore how the application works, you can log in with a special user account. This user has restricted options, preventing changes to their data, but you can fully manage passwords (though it's not secure as the cryptographic key is hardcoded in the application instead of using a steganographic badge).

Important: Do not enter any real personal data, as anyone can log into this user account and see it.

Login: Preview@milfinity.pl

Password: Preview#Preview123

## Działanie

Enigma uses AES-256 encryption to store sensitive data and steganography to securely store users' cryptographic keys.

- Encryption: The application uses a public-key method, meaning anyone with their private key can read and encrypt their data.

- Steganography: Steganography is used to securely store the user's cryptographic key. This key is embedded in a badge, which the user can save anywhere as an image. When the badge is used in the application, it allows the decryption of messages.

## Known Issues

- You cannot change your password from a different browser or device than the one where you clicked "change password."

## TODO

[x] Add custom avatars

[x] Add custom service icons

[x] Personalize app colors

[x] PWA + widgets

[x] Custom tile sorting

[x] Better button interactivity and page transitions
