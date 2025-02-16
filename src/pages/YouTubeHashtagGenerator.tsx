

import { useState, useEffect } from 'react';
import { Copy, Loader2, Moon, Sun, Youtube, Twitter, Github } from 'lucide-react';
import RelatedToolsSection from '@/components/RelatedToolsSection';

export default function HashtagGenerator() {
  const [keyword, setKeyword] = useState('');
  const [language, setLanguage] = useState('EN');
  const [hashtags, setHashtags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const languages = [
    { code: "AF", name: "Afrikaans" },
    { code: "SQ", name: "Albanian" },
    { code: "AR", name: "Arabic" },
    { code: "HY", name: "Armenian" },
    { code: "EU", name: "Basque" },
    { code: "BN", name: "Bengali" },
    { code: "BG", name: "Bulgarian" },
    { code: "CA", name: "Catalan" },
    { code: "KM", name: "Cambodian" },
    { code: "ZH", name: "Chinese (Mandarin)" },
    { code: "HR", name: "Croatian" },
    { code: "CS", name: "Czech" },
    { code: "DA", name: "Danish" },
    { code: "NL", name: "Dutch" },
    { code: "EN", name: "English" },
    { code: "ET", name: "Estonian" },
    { code: "FJ", name: "Fiji" },
    { code: "FI", name: "Finnish" },
    { code: "FR", name: "French" },
    { code: "KA", name: "Georgian" },
    { code: "DE", name: "German" },
    { code: "EL", name: "Greek" },
    { code: "GU", name: "Gujarati" },
    { code: "HE", name: "Hebrew" },
    { code: "HI", name: "Hindi" },
    { code: "HU", name: "Hungarian" },
    { code: "IS", name: "Icelandic" },
    { code: "ID", name: "Indonesian" },
    { code: "GA", name: "Irish" },
    { code: "IT", name: "Italian" },
    { code: "JA", name: "Japanese" },
    { code: "JW", name: "Javanese" },
    { code: "KO", name: "Korean" },
    { code: "LA", name: "Latin" },
    { code: "LV", name: "Latvian" },
    { code: "LT", name: "Lithuanian" },
    { code: "MK", name: "Macedonian" },
    { code: "MS", name: "Malay" },
    { code: "ML", name: "Malayalam" },
    { code: "MT", name: "Maltese" },
    { code: "MI", name: "Maori" },
    { code: "MR", name: "Marathi" },
    { code: "MN", name: "Mongolian" },
    { code: "NE", name: "Nepali" },
    { code: "NO", name: "Norwegian" },
    { code: "FA", name: "Persian" },
    { code: "PL", name: "Polish" },
    { code: "PT", name: "Portuguese" },
    { code: "PA", name: "Punjabi" },
    { code: "QU", name: "Quechua" },
    { code: "RO", name: "Romanian" },
    { code: "RU", name: "Russian" },
    { code: "SM", name: "Samoan" },
    { code: "SR", name: "Serbian" },
    { code: "SK", name: "Slovak" },
    { code: "SL", name: "Slovenian" },
    { code: "ES", name: "Spanish" },
    { code: "SW", name: "Swahili" },
    { code: "SV", name: "Swedish" },
    { code: "TA", name: "Tamil" },
    { code: "TT", name: "Tatar" },
    { code: "TE", name: "Telugu" },
    { code: "TH", name: "Thai" },
    { code: "BO", name: "Tibetan" },
    { code: "TO", name: "Tonga" },
    { code: "TR", name: "Turkish" },
    { code: "UK", name: "Ukrainian" },
    { code: "UR", name: "Urdu" },
    { code: "UZ", name: "Uzbek" },
    { code: "VI", name: "Vietnamese" },
    { code: "CY", name: "Welsh" },
    { code: "XH", name: "Xhosa" }
  ];

  const generateHashtags = async () => {
    if (!keyword.trim()) return;
    
    setLoading(true);
    try {
      const selectedLanguage = languages.find(lang => lang.code === language);
      const response = await fetch('https://www.sitebrew.ai/api/genai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are a YouTube hashtag generator. Generate 10 relevant hashtags for the keyword: "${keyword}". The hashtags should be in ${selectedLanguage.name}. Only respond with the hashtags, separated by spaces, each starting with #.`
            }
          ]
        })
      });
      
      const data = await response.json();
      const hashtagArray = data.message.content.split(' ').filter(tag => tag.startsWith('#'));
      setHashtags(hashtagArray);
    } catch (error) {
      console.error('Error generating hashtags:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hashtags.join(' '));
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const presetHashtags = {
    'PlayStation 5': ['#PS5', '#PlayStation5', '#Gaming', '#PlayStation', '#Sony', '#GamerLife', '#GamersUnite', '#PS5Games', '#PS5Share', '#NextGen'],
    'Xbox Series X': ['#Xbox', '#XboxSeriesX', '#Microsoft', '#Gaming', '#XboxShare', '#XboxGamePass', '#Gamer', '#XboxGaming', '#NextGenGaming', '#XboxCommunity'],
    'Nintendo Switch': ['#NintendoSwitch', '#Nintendo', '#Switch', '#NintendoGaming', '#Gaming', '#NintendoLife', '#SwitchGaming', '#NintendoCommunity', '#SwitchShare', '#HybridGaming'],
    'PC Gaming': ['#PCGaming', '#PCMasterRace', '#Gaming', '#PCGamer', '#Steam', '#GamersUnite', '#PCBuild', '#RGBLights', '#GamingPC', '#PCMods']
  };

  const handlePresetClick = (preset) => {
    setHashtags(presetHashtags[preset]);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark:bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`border-b ${darkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Youtube className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Hashtag Generator
              </h1>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className={`rounded-2xl shadow-lg p-8 ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-3xl font-bold mb-2 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            YouTube Hashtag Generator
          </h2>
          <p className={`text-center mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Generate relevant hashtags for your YouTube videos
          </p>

          {/* Preset Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {Object.keys(presetHashtags).map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetClick(preset)}
                className={`p-2 text-sm rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="keyword" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Enter your video's main keyword
              </label>
              <input
                type="text"
                id="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                }`}
                placeholder="e.g., cooking tutorial"
              />
            </div>

            <div>
              <label htmlFor="language" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Select Language
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                }`}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={generateHashtags}
              disabled={loading || !keyword.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Generating...
                </span>
              ) : (
                'Generate Hashtags'
              )}
            </button>

            {hashtags.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-2">
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Generated Hashtags
                  </h2>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center text-sm text-blue-500 hover:text-blue-600"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy All
                  </button>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex flex-wrap gap-2">
                    {hashtags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm ${
                          darkMode 
                            ? 'bg-gray-600 text-white' 
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
           {/* Related Tools Section */}
           <RelatedToolsSection/>
      </main>

      {/* Footer */}
      <footer className={`border-t ${darkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2024 YouTube Hashtag Generator. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                Privacy Policy
              </a>
              <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                Terms of Service
              </a>
              <div className="flex space-x-4">
                <Twitter className={`h-5 w-5 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} />
                <Github className={`h-5 w-5 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

