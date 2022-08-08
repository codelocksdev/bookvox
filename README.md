# bookvox

bookvox provides a simple user interface for converting text to speech and organizing the output as book chapters. The text-to-speech capability is powered by AWS Polly. 

![image](https://user-images.githubusercontent.com/29578272/183438659-0f2fde18-12fe-4b8f-a4d7-82a70ea8f914.png)


## Usage

### AWS Credentials

An AWS account is required to run this app. See https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/ for information on creating an AWS account. You will also need to create an IAM entry that enabled Polly on your credentials. See https://docs.aws.amazon.com/polly/latest/dg/security_iam_id-based-policy-examples.html for information on enabling Polly.

The app will prompt you for an access key ID and a secret access key. These are the credentials you create in your IAM settings and are private to you. The app does not store these credentials outside the session. DO NOT share these credentials with others.

#### Cost & Disclaimer

Note that the use of AWS is not free. There is generally a 12 month grace period where certain 'free-tier' perks are provided. In this period there is typically some amount of characters that may be processed by Polly per month that will incur no charges. Beyond that, AWS employs a pay-as-you-go model for Polly speech synthesis. See https://aws.amazon.com/polly/pricing/ for full details on the cost of using AWS.

#### The maintainers of this repo are not responsible for costs incurred with the use of this app. 

### Creating an Audiobook

#### Validation

When you first open bookvox, you will be prompted to supply your AWS access key ID and secret access key. These keys are yours alone and are never stored by the app outside your session.

#### The Book Queue

bookvox allows you to create a queue of books to convert. Each book consists of a set of one or more plain text files which are treated as chapters. Each book will output a set of mp3s, one per text file, into bookvox output directory, in a subdirectory named for the provided book title.

Click Add Book to give a book a title and text files for processing. Here you may also edit the output names of each text file, if desired. In the dialog, click Add Book again to add it to the queue. 

You may convert a single book by pressing the convert icon on the right side of the book queue entry. Or you may press the Convert All button at the bottom of the queue to convert all books that have not yet been processed.

#### Listening

Mp3 files are automatically saved by default to a folder in your home directory called 'bookvox'. Each book is given its own subdirectory containing its audio output. Mp3 files are automatically named with the names given when adding the book. Additionally, after conversion, a player is added next to each chapter file for convenience to preview the output.


### Settings

The settings menu provides the ability to customize or update several aspects of the app. All settings are automatically saved once changed.

#### Output

You may change the parent output folder name into which book audio will be saved.

#### Voice

An interactive voice selector tool allows you to pick your processing type, the choice of voice, and speed of reading and listen to a sample output for those settings.

#### AWS Credentials

If you need to update your access key ID and secret access key, you may do it here.

# Roadmap

bookvox is a work in progress. In the future I hope to support the following features:

* PDF input.
* EPUB input.
* All Polly languages and voices for speech synthesis.
