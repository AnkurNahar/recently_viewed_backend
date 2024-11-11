const nodemailer = require("nodemailer");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const TIMEFRAME_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const VIEW_THRESHOLD = 2; // More than twice within the timeframe

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "noddingOff100@gmail.com",
      pass: "nodeMailing100",
    },
});

exports.notifyFrequentViews = functions.firestore
  .document('users/{userId}/recentlyViewed/{viewId}')
  .onWrite(async (snap, context) => {
    const { userId, viewId } = context.params;
    const productData = snap.after.data();
    const productId = productData.productId;

    if (!productData) {
      return;
    } 

    const now = Date.now();
    const recentViewsRef = admin.firestore().collection('users').doc(userId).collection('recentlyViewed');
    
    // Quering for this product within the last 24 hours
    const recentViewsSnapshot = await recentViewsRef
      .where('productId', '==', productId)
      .where('viewedAt', '>=', new Date(now - TIMEFRAME_MS))
      .get();

    // Check if the product was viewed more than the threshold
    if (recentViewsSnapshot.size > VIEW_THRESHOLD) {
        try {
            // Fetching user email
            const userDoc = await admin.firestore().collection('users').doc(userId).get();
            const userEmail = userDoc.data().email;

            if (!userEmail) {
                console.log(`No email found for user ${userId}`);
                return;
            }

            const mailOptions = {
                from: 'noddingOff100@gmail.com',
                to: userEmail, 
                subject: 'Product Viewed Frequently',
                text: `Product ${productData.productName} has been viewed more than twice in the last 24 hours.`,
            };
      
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${userEmail} for product ${productId}`);
        } catch (error) {
            
        }
    }
  });