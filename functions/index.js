const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const sgMail = require('@sendgrid/mail');

// Required to use console.log properly
require("firebase-functions/lib/logger/compat");

// Using @sendgrid/mail
// TODO: Configure the `sendgrid.key` and `sendgrid.template` Google Cloud environment variables.
const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;
sgMail.setApiKey(API_KEY);

// Sends an email confirmation when a user changes his mailing list subscription.
exports.sendVerificationEmail = functions
  .auth
  .user()
  .onCreate((user) => {
		// if the created account has a valid email and it is not considered
		// as verified, the email for verification is sent.
		if (user.email && !user.emailVerified) {
			admin.auth().generateEmailVerificationLink(user.email)
	      .then(async (link) => {
	        // Construct email verification template, embed the link and send
	        // using Sendgrid.
					const msg = {
			        to: user.email,
			        from: 'support@epamfrbs.xyz',
			        templateId: TEMPLATE_ID,
			        dynamic_template_data: {
			            confirmationLink: link,
			            username: user.displayName,
			        },
			    };
					return sgMail.send(msg);
	      })
	      .catch((error) => {
	        console.error(error);
	        return error;
	      });
		} else {
			// If the email is already verified
			if (user.emailVerified){
					console.info("Email already verified");
			}
			// If there is no email in the created account
			else {
					console.info("No email in the account");
			}
			return null;
		}

  });


// TODO: Split this file to manage each function in an individual file

// TODO: Create a different function to send the emailLink message using a
// sendgrid template
