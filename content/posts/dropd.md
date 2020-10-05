---
title: "dropd: easy local file sharing"
date: 2017-03-21
description: dropd is an extremely simple web-based temporary file mailbox. I wrote it to simplify sharing files between computers at home.
draft: false
---

Copying files between home computers is surprisingly complicated. I often need to move something from one computer to another (audio or video recordings, photos, disk images, etc) and regularly struggle.

* Dropbox et al work well and are my preferred option, but can be slow (esp. Dropbox) and a I almost never remember to delete things when I’m done.
* Flash drives are always there except when I need them.
* FTP servers and network drives are a great idea but hard to interface with, especially if I’m trying to do a one-time copy to or from a friend or visitors computer.

This week’s Raspberry Pi project, therefore, is [dropd](https://github.com/anyweez/dropd), an extremely simple, web-based temporary file mailbox. You run the server then anyone on the local network can connect to it, drag and drop files, or click them to download them. dropd optionally deletes files after they’ve been in place for some amount of time, meaning that explicit cleanup is never required. No installation or setup is required on user computers once dropd is installed on the server.

This project is currently a proof-of-concept, but it works pretty smoothly in my installation at home; I’ve currently got it running on a Raspberry Pi with a 2TB hard drive plugged in. The proof, however, is in the pudding, so its time to try this out for a few weeks and see if it might be the simple solution I’ve been searching for.