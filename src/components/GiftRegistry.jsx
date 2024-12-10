import { motion } from 'framer-motion';
import { Copy, Check, QrCode } from 'lucide-react';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import data from '../data';

export default function GiftRegistry() {
  const [copied, setCopied] = useState(null);
  const [showAccounts, setShowAccounts] = useState(false);

  const handleCopy = (number) => {
    navigator.clipboard.writeText(number);
    setCopied(number);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="gifts" className="py-20 px-10 md:px-4 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl text-center text-title mb-8"
        >
          Wedding Gift
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          Your presence is our greatest gift. If you're unable to join us and wish to send your love in the form of a gift, please click the button below:
        </motion.p>

        <div className="flex justify-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setShowAccounts(!showAccounts)}
            className="px-8 py-3 bg-transparent border-2 border-button text-button rounded-full font-semibold transition-all transform hover:scale-105"
          >
            Send Gift
          </motion.button>
        </div>

        {showAccounts && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid md:grid-cols-2 gap-8 mt-8"
          >
            {data.gift.accounts.map((account, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md"
              >
                <div className="text-center mb-6">
                  <h3 className="font-heading text-2xl text-title mb-2">{account.bank}</h3>
                  <p className="text-lg text-accent">{account.name}</p>
                </div>

                <div className="flex justify-center mb-6">
                  <QRCodeSVG value={account.qr} size={150} />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={account.number}
                    readOnly
                    className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md bg-gray-50"
                  />
                  <button
                    onClick={() => handleCopy(account.number)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:text-accent"
                  >
                    {copied === account.number ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}