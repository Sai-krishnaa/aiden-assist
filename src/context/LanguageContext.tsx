import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language =
  | 'english'
  | 'hindi'
  | 'telugu'
  | 'tamil'
  | 'bengali'
  | 'marathi'
  | 'gujarati'
  | 'kannada'
  | 'malayalam'
  | 'odia'
  | 'punjabi';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  emergencyNumber: string;
}

export const languages: LanguageInfo[] = [
  { code: 'english', name: 'English', nativeName: 'English', emergencyNumber: '108' },
  { code: 'hindi', name: 'Hindi', nativeName: 'हिन्दी', emergencyNumber: '108' },
  { code: 'telugu', name: 'Telugu', nativeName: 'తెలుగు', emergencyNumber: '108' },
  { code: 'tamil', name: 'Tamil', nativeName: 'தமிழ்', emergencyNumber: '108' },
  { code: 'bengali', name: 'Bengali', nativeName: 'বাংলা', emergencyNumber: '108' },
  { code: 'marathi', name: 'Marathi', nativeName: 'मराठी', emergencyNumber: '108' },
  { code: 'gujarati', name: 'Gujarati', nativeName: 'ગુજરાતી', emergencyNumber: '108' },
  { code: 'kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ', emergencyNumber: '108' },
  { code: 'malayalam', name: 'Malayalam', nativeName: 'മലയാളം', emergencyNumber: '108' },
  { code: 'odia', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', emergencyNumber: '108' },
  { code: 'punjabi', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', emergencyNumber: '108' },
];


type TranslationKey = 
  | 'hero.badge'
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.startAssessment'
  | 'hero.callEmergency'
  | 'hero.step1'
  | 'hero.step2'
  | 'hero.step3'
  | 'form.question'
  | 'form.whatHappened'
  | 'form.isConscious'
  | 'form.ageGroup'
  | 'form.location'
  | 'form.locationPlaceholder'
  | 'form.back'
  | 'form.continue'
  | 'form.getAssessment'
  | 'incident.accident'
  | 'incident.collapse'
  | 'incident.breathing'
  | 'incident.bleeding'
  | 'incident.other'
  | 'conscious.yes'
  | 'conscious.no'
  | 'conscious.unsure'
  | 'age.child'
  | 'age.adult'
  | 'age.elderly'
  | 'result.emergency'
  | 'result.urgent'
  | 'result.nonEmergency'
  | 'result.emergencyExplanation'
  | 'result.urgentExplanation'
  | 'result.nonEmergencyExplanation'
  | 'result.emergencyRecommendation'
  | 'result.urgentRecommendation'
  | 'result.nonEmergencyRecommendation'
  | 'result.recommendedAction'
  | 'result.ambulanceType'
  | 'result.viewSummary'
  | 'ambulance.basic'
  | 'ambulance.cardiac'
  | 'ambulance.trauma'
  | 'summary.title'
  | 'summary.subtitle'
  | 'summary.incidentType'
  | 'summary.ageGroup'
  | 'summary.conscious'
  | 'summary.location'
  | 'summary.ambulanceType'
  | 'summary.preArrivalNote'
  | 'summary.call'
  | 'summary.copy'
  | 'summary.share'
  | 'summary.copied'
  | 'summary.viewTips'
  | 'summary.disclaimer'
  | 'summary.patientLocation'
  | 'waiting.title'
  | 'waiting.subtitle'
  | 'waiting.stayCalmTitle'
  | 'waiting.stayCalmDesc'
  | 'waiting.keepStillTitle'
  | 'waiting.keepStillDesc'
  | 'waiting.followTitle'
  | 'waiting.followDesc'
  | 'waiting.notice'
  | 'waiting.startOver'
  | 'footer.disclaimer'
  | 'footer.copyright'
  | 'a11y.urgencyAnnouncement'
  | 'a11y.skipToMain'
  | 'a11y.progressAnnouncement'
  
  | 'form.chooseAnyOne'
  | 'form.voiceOptional'
  | 'form.startRecording'
  | 'form.stopRecording'
  | 'form.photoOptional'
  | 'form.uploadOrCapture'
  | 'form.photoPreviewAlt'
  | 'form.describeWhatHappened'
  | 'form.describePlaceholder'
  | 'form.optional'
  | 'form.atLeastOneRequired'
  
  | 'conscious.yesDesc'
  | 'conscious.noDesc'
  | 'conscious.unsureDesc';

const translations: Record<Language, Record<TranslationKey, string>> = {
  english: {
    'hero.badge': 'Emergency Assistance',
    'hero.title': 'Get help fast during a medical emergency',
    'hero.subtitle': 'Answer a few quick questions to help emergency responders act faster.',
    'hero.startAssessment': 'Start Emergency Assessment',
    'hero.callEmergency': 'Call Emergency Services',
    'hero.step1': 'Answer a few quick questions',
    'hero.step2': 'Assess urgency level',
    'hero.step3': 'Get the right help fast',
    'form.question': 'Question',
    'form.whatHappened': 'What happened?',
    'form.isConscious': 'Is the patient conscious?',
    'form.ageGroup': 'Age group of the patient?',
    'form.location': 'Where is the patient?',
    'form.locationPlaceholder': 'Enter address or describe location',
    'form.back': 'Back',
    'form.continue': 'Continue',
    'form.getAssessment': 'Continue',
    'incident.accident': 'Accident',
    'incident.collapse': 'Sudden Collapse',
    'incident.breathing': 'Breathing Problem',
    'incident.bleeding': 'Severe Bleeding',
    'incident.other': 'Other',
    'conscious.yes': 'Yes',
    'conscious.no': 'No',
    'conscious.unsure': 'Not Sure',
    'age.child': 'Child',
    'age.adult': 'Adult',
    'age.elderly': 'Elderly',
    'result.emergency': 'Emergency',
    'result.urgent': 'Urgent',
    'result.nonEmergency': 'Non-Emergency',
    'result.emergencyExplanation': 'Based on your answers, immediate professional help is recommended.',
    'result.urgentExplanation': 'This situation requires prompt medical attention.',
    'result.nonEmergencyExplanation': 'The situation appears stable but monitoring is advised.',
    'result.emergencyRecommendation': 'Call emergency services immediately',
    'result.urgentRecommendation': 'Seek medical attention as soon as possible',
    'result.nonEmergencyRecommendation': 'Consider visiting a healthcare provider',
    'result.recommendedAction': 'Recommended Action',
    'result.ambulanceType': 'Recommended Ambulance Type',
    'result.viewSummary': 'View Dispatch Summary',
    'ambulance.basic': 'Basic Life Support',
    'ambulance.cardiac': 'Cardiac Life Support',
    'ambulance.trauma': 'Trauma Ambulance',
    'summary.title': 'Dispatch Summary',
    'summary.subtitle': 'Share this information with emergency services',
    'summary.incidentType': 'Incident Type',
    'summary.ageGroup': 'Age Group',
    'summary.conscious': 'Conscious',
    'summary.location': 'Location',
    'summary.ambulanceType': 'Ambulance Type',
    'summary.preArrivalNote': 'Pre-Arrival Note',
    'summary.call': 'Call',
    'summary.copy': 'Copy Summary',
    'summary.share': 'Share',
    'summary.copied': 'Copied',
    'summary.viewTips': 'View Safety Tips While Waiting',
    'summary.disclaimer': 'This tool does not provide medical diagnosis. Assessment is based on user-provided information only.',
    'summary.patientLocation': 'Patient Location',
    'waiting.title': 'While Help Is On The Way',
    'waiting.subtitle': 'Here are some things you can do while waiting',
    'waiting.stayCalmTitle': 'Stay Calm',
    'waiting.stayCalmDesc': 'Take slow, deep breaths. Your calm presence helps the patient.',
    'waiting.keepStillTitle': 'Keep Patient Still',
    'waiting.keepStillDesc': 'Unless there\'s immediate danger, avoid moving the patient.',
    'waiting.followTitle': 'Follow Instructions',
    'waiting.followDesc': 'If you called emergency services, follow their guidance.',
    'waiting.notice': 'This guidance is general in nature. Always follow specific instructions from emergency services operators when available.',
    'waiting.startOver': 'Start Over',
    'footer.disclaimer': 'Important: This tool does not provide medical diagnosis or advice. It is designed to help organize information for emergency responders. Always call emergency services directly in life-threatening situations.',
    'footer.copyright': 'Emergency Triage Assistant • MVP Prototype',
    'a11y.urgencyAnnouncement': 'Assessment complete. Urgency level:',
    'a11y.skipToMain': 'Skip to main content',
    'a11y.progressAnnouncement': 'Question {current} of {total}',

    'form.chooseAnyOne':
      'You can choose any one option below to describe what happened.',
    'form.voiceOptional':
      'Or record a short voice description (optional).',
    'form.startRecording': 'Start recording',
    'form.stopRecording': 'Stop recording',
    'form.photoOptional':
      'Or upload / capture a photo (optional).',
    'form.uploadOrCapture': 'Upload or capture photo',
    'form.photoPreviewAlt': 'Preview of the selected photo',
    'form.describeWhatHappened': 'Describe what happened',
    'form.describePlaceholder':
      'Provide additional details about the emergency...',
    'form.optional': 'optional',
    'form.atLeastOneRequired':
      'Choose at least one: quick option, voice note, photo, or message.',
      'conscious.yesDesc': 'Patient is awake and responsive',
'conscious.noDesc': 'Patient is unresponsive',
'conscious.unsureDesc': 'Unable to determine consciousness',
  },
  hindi: {
  'hero.badge': 'आपातकालीन सहायता',
  'hero.title': 'चिकित्सा आपात स्थिति में तुरंत सहायता प्राप्त करें',
  'hero.subtitle': 'कुछ त्वरित प्रश्नों का उत्तर दें ताकि आपात सेवाएं जल्दी कार्य कर सकें।',
  'hero.startAssessment': 'आपात मूल्यांकन शुरू करें',
  'hero.callEmergency': 'आपातकालीन सेवाओं को कॉल करें',
  'hero.step1': 'कुछ त्वरित प्रश्नों का उत्तर दें',
  'hero.step2': 'आपात स्थिति का आकलन',
  'hero.step3': 'सही सहायता प्राप्त करें',

  'form.question': 'प्रश्न',
  'form.whatHappened': 'क्या हुआ?',
  'form.isConscious': 'क्या मरीज होश में है?',
  'form.ageGroup': 'मरीज की आयु वर्ग?',
  'form.location': 'मरीज कहां है?',
  'form.locationPlaceholder': 'पता दर्ज करें या स्थान बताएं',
  'form.back': 'वापस',
  'form.continue': 'जारी रखें',
  'form.getAssessment': 'मूल्यांकन प्राप्त करें',

  'incident.accident': 'दुर्घटना',
  'incident.collapse': 'अचानक गिरना',
  'incident.breathing': 'सांस लेने में समस्या',
  'incident.bleeding': 'अधिक रक्तस्राव',
  'incident.other': 'अन्य',

  'conscious.yes': 'हाँ',
  'conscious.no': 'नहीं',
  'conscious.unsure': 'पता नहीं',

  'age.child': 'बच्चा',
  'age.adult': 'वयस्क',
  'age.elderly': 'वृद्ध',

  'result.emergency': 'आपातकाल',
  'result.urgent': 'तत्काल',
  'result.nonEmergency': 'गैर-आपातकाल',

  'result.emergencyExplanation': 'आपके उत्तरों के आधार पर तुरंत पेशेवर सहायता आवश्यक है।',
  'result.urgentExplanation': 'इस स्थिति में शीघ्र चिकित्सा सहायता आवश्यक है।',
  'result.nonEmergencyExplanation': 'स्थिति स्थिर प्रतीत होती है, लेकिन निगरानी आवश्यक है।',

  'result.emergencyRecommendation': 'तुरंत आपात सेवाओं को कॉल करें',
  'result.urgentRecommendation': 'जितनी जल्दी हो सके चिकित्सा सहायता लें',
  'result.nonEmergencyRecommendation': 'स्वास्थ्य सेवा प्रदाता से संपर्क करें',

  'result.recommendedAction': 'अनुशंसित कार्य',
  'result.ambulanceType': 'अनुशंसित एम्बुलेंस प्रकार',
  'result.viewSummary': 'डिस्पैच सारांश देखें',

  'ambulance.basic': 'बेसिक लाइफ सपोर्ट',
  'ambulance.cardiac': 'कार्डियक लाइफ सपोर्ट',
  'ambulance.trauma': 'ट्रॉमा एम्बुलेंस',

  'summary.title': 'डिस्पैच सारांश',
  'summary.subtitle': 'इस जानकारी को आपात सेवाओं के साथ साझा करें',
  'summary.incidentType': 'घटना का प्रकार',
  'summary.ageGroup': 'आयु वर्ग',
  'summary.conscious': 'होश की स्थिति',
  'summary.location': 'स्थान',
  'summary.ambulanceType': 'एम्बुलेंस प्रकार',
  'summary.preArrivalNote': 'पहुंचने से पहले नोट',
  'summary.call': 'कॉल करें',
  'summary.copy': 'सारांश कॉपी करें',
  'summary.share': 'साझा करें',
  'summary.copied': 'कॉपी किया गया',
  'summary.viewTips': 'प्रतीक्षा के दौरान सुरक्षा सुझाव देखें',
  'summary.disclaimer': 'यह उपकरण चिकित्सा निदान प्रदान नहीं करता।',
  'summary.patientLocation': 'मरीज का स्थान',

  'waiting.title': 'मदद रास्ते में है',
  'waiting.subtitle': 'प्रतीक्षा करते समय आप ये कर सकते हैं',
  'waiting.stayCalmTitle': 'शांत रहें',
  'waiting.stayCalmDesc': 'धीरे और गहरी सांस लें। आपकी शांति मरीज को मदद करती है।',
  'waiting.keepStillTitle': 'मरीज को स्थिर रखें',
  'waiting.keepStillDesc': 'तुरंत खतरा न हो तो मरीज को न हिलाएं।',
  'waiting.followTitle': 'निर्देशों का पालन करें',
  'waiting.followDesc': 'यदि आपने आपात सेवाओं को कॉल किया है तो उनके निर्देशों का पालन करें।',
  'waiting.notice': 'यह सामान्य मार्गदर्शन है। आपात ऑपरेटर के निर्देशों को प्राथमिकता दें।',
  'waiting.startOver': 'फिर से शुरू करें',

  'footer.disclaimer': 'यह उपकरण चिकित्सा सलाह नहीं देता। जीवन-धमकी की स्थिति में सीधे आपात सेवाओं को कॉल करें।',
  'footer.copyright': 'आपात ट्रायेज सहायक • MVP प्रोटोटाइप',

  'a11y.urgencyAnnouncement': 'मूल्यांकन पूर्ण। आपात स्तर:',
  'a11y.skipToMain': 'मुख्य सामग्री पर जाएं',
  'a11y.progressAnnouncement': 'प्रश्न {current} में से {total}',

  'form.chooseAnyOne':
  'आप नीचे दिए गए किसी भी एक विकल्प से बता सकते हैं कि क्या हुआ।',
'form.voiceOptional':
  'या एक छोटा वॉइस विवरण रिकॉर्ड करें (वैकल्पिक)।',
'form.startRecording': 'रिकॉर्डिंग शुरू करें',
'form.stopRecording': 'रिकॉर्डिंग रोकें',
'form.photoOptional':
  'या फोटो अपलोड / कैप्चर करें (वैकल्पिक)।',
'form.uploadOrCapture': 'फोटो अपलोड या कैप्चर करें',
'form.photoPreviewAlt': 'चुनी गई फोटो का प्रीव्यू',
'form.describeWhatHappened': 'क्या हुआ, बताएं',
'form.describePlaceholder':
  'आपात स्थिति के बारे में अतिरिक्त विवरण दें...',
'form.optional': 'वैकल्पिक',
'form.atLeastOneRequired':
  'कम से कम एक चुनें: क्विक विकल्प, वॉइस नोट, फोटो या संदेश।',
  'conscious.yesDesc': 'रोगी जाग रहे हैं और प्रतिक्रिया दे रहे हैं',
'conscious.noDesc': 'रोगी बेहोश है, प्रतिक्रिया नहीं दे रहा',
'conscious.unsureDesc': 'मरीज की होश की स्थिति स्पष्ट नहीं है',

},
telugu: {
  'hero.badge': 'అత్యవసర సహాయం',
  'hero.title': 'వైద్య అత్యవసర పరిస్థితిలో త్వరగా సహాయం పొందండి',
  'hero.subtitle': 'అత్యవసర సేవలు వేగంగా స్పందించేందుకు కొన్ని ప్రశ్నలకు సమాధానం ఇవ్వండి.',
  'hero.startAssessment': 'అత్యవసర అంచనాను ప్రారంభించండి',
  'hero.callEmergency': 'అత్యవసర సేవలకు కాల్ చేయండి',
  'hero.step1': 'త్వరిత ప్రశ్నలకు సమాధానం ఇవ్వండి',
  'hero.step2': 'తీవ్రతను అంచనా వేయండి',
  'hero.step3': 'సరైన సహాయం పొందండి',

  'form.question': 'ప్రశ్న',
  'form.whatHappened': 'ఏం జరిగింది?',
  'form.isConscious': 'రోగి స్పృహలో ఉన్నాడా?',
  'form.ageGroup': 'రోగి వయస్సు వర్గం?',
  'form.location': 'రోగి ఎక్కడ ఉన్నాడు?',
  'form.locationPlaceholder': 'చిరునామా నమోదు చేయండి లేదా స్థలాన్ని వివరించండి',
  'form.back': 'వెనక్కి',
  'form.continue': 'కొనసాగించండి',
  'form.getAssessment': 'అంచనాను పొందండి',

  'incident.accident': 'ప్రమాదం',
  'incident.collapse': 'అకస్మాత్తుగా కుప్పకూలడం',
  'incident.breathing': 'శ్వాస సమస్య',
  'incident.bleeding': 'తీవ్ర రక్తస్రావం',
  'incident.other': 'ఇతర',

  'conscious.yes': 'అవును',
  'conscious.no': 'కాదు',
  'conscious.unsure': 'తెలియదు',

  'age.child': 'పిల్ల',
  'age.adult': 'వయోజనుడు',
  'age.elderly': 'వృద్ధుడు',

  'result.emergency': 'అత్యవసరం',
  'result.urgent': 'తక్షణం',
  'result.nonEmergency': 'అత్యవసరం కాదు',

  'result.emergencyExplanation': 'మీ సమాధానాల ఆధారంగా తక్షణ వైద్య సహాయం అవసరం.',
  'result.urgentExplanation': 'ఈ పరిస్థితికి త్వరిత వైద్య శ్రద్ధ అవసరం.',
  'result.nonEmergencyExplanation': 'పరిస్థితి స్థిరంగా ఉంది, కానీ పర్యవేక్షణ అవసరం.',

  'result.emergencyRecommendation': 'తక్షణమే అత్యవసర సేవలకు కాల్ చేయండి',
  'result.urgentRecommendation': 'వెంటనే వైద్య సహాయం పొందండి',
  'result.nonEmergencyRecommendation': 'ఆరోగ్య సేవాదారుడిని సంప్రదించండి',

  'result.recommendedAction': 'సిఫారసు చేసిన చర్య',
  'result.ambulanceType': 'సిఫారసు చేసిన అంబులెన్స్ రకం',
  'result.viewSummary': 'డిస్పాచ్ సారాంశం చూడండి',

  'ambulance.basic': 'ప్రాథమిక జీవన సహాయం',
  'ambulance.cardiac': 'హృదయ జీవన సహాయం',
  'ambulance.trauma': 'ట్రామా అంబులెన్స్',

  'summary.title': 'డిస్పాచ్ సారాంశం',
  'summary.subtitle': 'ఈ సమాచారాన్ని అత్యవసర సేవలతో పంచుకోండి',
  'summary.incidentType': 'ఘటన రకం',
  'summary.ageGroup': 'వయస్సు వర్గం',
  'summary.conscious': 'స్పృహ',
  'summary.location': 'స్థానం',
  'summary.ambulanceType': 'అంబులెన్స్ రకం',
  'summary.preArrivalNote': 'రాక ముందు గమనిక',
  'summary.call': 'కాల్ చేయండి',
  'summary.copy': 'సారాంశం కాపీ చేయండి',
  'summary.share': 'పంచుకోండి',
  'summary.copied': 'కాపీ అయింది',
  'summary.viewTips': 'వేచి ఉండగా భద్రతా సూచనలు చూడండి',
  'summary.disclaimer': 'ఈ సాధనం వైద్య నిర్ధారణ ఇవ్వదు.',
  'summary.patientLocation': 'రోగి స్థానం',

  'waiting.title': 'సహాయం వస్తోంది',
  'waiting.subtitle': 'వేచి ఉండగా మీరు చేయవలసినవి',
  'waiting.stayCalmTitle': 'శాంతంగా ఉండండి',
  'waiting.stayCalmDesc': 'నెమ్మదిగా లోతైన శ్వాస తీసుకోండి.',
  'waiting.keepStillTitle': 'రోగిని కదలకుండా ఉంచండి',
  'waiting.keepStillDesc': 'తక్షణ ప్రమాదం లేకపోతే కదల్చవద్దు.',
  'waiting.followTitle': 'సూచనలను అనుసరించండి',
  'waiting.followDesc': 'మీరు అత్యవసర సేవలకు కాల్ చేసినట్లయితే వారి సూచనలను పాటించండి.',
  'waiting.notice': 'ఇవి సాధారణ మార్గదర్శకాలు మాత్రమే.',
  'waiting.startOver': 'మళ్లీ ప్రారంభించండి',

  'footer.disclaimer': 'ఈ సాధనం వైద్య సలహా ఇవ్వదు.',
  'footer.copyright': 'ఎమర్జెన్సీ ట్రయేజ్ అసిస్టెంట్ • MVP',

  'a11y.urgencyAnnouncement': 'అంచనా పూర్తయింది. తీవ్రత స్థాయి:',
  'a11y.skipToMain': 'ప్రధాన విషయానికి వెళ్లండి',
  'a11y.progressAnnouncement': '{total} లో {current} ప్రశ్న',

  'form.chooseAnyOne':
  'ఏం జరిగింది అనేది క్రింది ఎంపికలలో ఏదో ఒకదాన్ని ఎంచుకొని చెప్పండి.',
'form.voiceOptional':
  'లేదా చిన్న వాయిస్ వివరణను రికార్డ్ చేయండి (ఐచ్ఛికం).',
'form.startRecording': 'రికార్డింగ్ ప్రారంభించండి',
'form.stopRecording': 'రికార్డింగ్ ఆపండి',
'form.photoOptional':
  'లేదా ఫోటోను అప్లోడ్ / క్యాప్చర్ చేయండి (ఐచ్ఛికం).',
'form.uploadOrCapture': 'ఫోటో అప్లోడ్ లేదా క్యాప్చర్ చేయండి',
'form.photoPreviewAlt': 'ఎంచుకున్న ఫోటో ప్రీవ్యూ',
'form.describeWhatHappened': 'ఏం జరిగిందో వివరించండి',
'form.describePlaceholder':
  'అత్యవసర పరిస్థితి గురించి అదనపు వివరాలు నమోదు చేయండి...',
'form.optional': 'ఐచ్ఛికం',
'form.atLeastOneRequired':
  'కనీసం ఒకటి ఎంచుకోండి: క్విక్ ఆప్షన్, వాయిస్ నోట్, ఫోటో లేదా మెసేజ్.',
  'conscious.yesDesc': 'రోగి మేల్కొని స్పందిస్తున్నాడు',
'conscious.noDesc': 'రోగి అపస్మారక స్థితిలో ఉన్నాడు, స్పందన లేదు',
'conscious.unsureDesc': 'చేతన స్థితి గురించి ఖచ్చితంగా చెప్పలేము',

},
tamil: {
  'hero.badge': 'அவசர உதவி',
  'hero.title': 'மருத்துவ அவசர நிலையில் விரைவாக உதவி பெறுங்கள்',
  'hero.subtitle': 'அவசர சேவைகள் விரைவாக செயல்பட சில கேள்விகளுக்கு பதிலளிக்கவும்.',
  'hero.startAssessment': 'அவசர மதிப்பீட்டை தொடங்கு',
  'hero.callEmergency': 'அவசர சேவையை அழைக்கவும்',
  'hero.step1': 'விரைவு கேள்விகளுக்கு பதிலளிக்கவும்',
  'hero.step2': 'அவசர நிலையை மதிப்பிடுங்கள்',
  'hero.step3': 'சரியான உதவியை பெறுங்கள்',

  'form.question': 'கேள்வி',
  'form.whatHappened': 'என்ன நடந்தது?',
  'form.isConscious': 'நோயாளி உணர்வுடன் உள்ளாரா?',
  'form.ageGroup': 'நோயாளியின் வயது குழு?',
  'form.location': 'நோயாளர் எங்கே உள்ளார்?',
  'form.locationPlaceholder': 'முகவரியை உள்ளிடவும் அல்லது இடத்தை விளக்கவும்',
  'form.back': 'பின்செல்',
  'form.continue': 'தொடரவும்',
  'form.getAssessment': 'மதிப்பீட்டை பெறவும்',

  'incident.accident': 'விபத்து',
  'incident.collapse': 'திடீர் மயக்கம்',
  'incident.breathing': 'மூச்சுத்திணறல்',
  'incident.bleeding': 'அதிக ரத்தப்போக்கு',
  'incident.other': 'மற்றவை',

  'conscious.yes': 'ஆம்',
  'conscious.no': 'இல்லை',
  'conscious.unsure': 'தெரியவில்லை',

  'age.child': 'குழந்தை',
  'age.adult': 'வயது வந்தவர்',
  'age.elderly': 'மூத்தவர்',

  'result.emergency': 'அவசரம்',
  'result.urgent': 'உடனடி',
  'result.nonEmergency': 'அவசரம் அல்ல',

  'result.emergencyExplanation': 'உங்கள் பதில்களின் அடிப்படையில் உடனடி மருத்துவ உதவி தேவை.',
  'result.urgentExplanation': 'இந்த நிலைக்கு விரைவான மருத்துவ கவனம் தேவை.',
  'result.nonEmergencyExplanation': 'நிலைமை நிலையாக உள்ளது, ஆனால் கண்காணிப்பு அவசியம்.',

  'result.emergencyRecommendation': 'உடனடியாக அவசர சேவையை அழைக்கவும்',
  'result.urgentRecommendation': 'விரைவில் மருத்துவ உதவி பெறவும்',
  'result.nonEmergencyRecommendation': 'மருத்துவரை அணுகவும்',

  'result.recommendedAction': 'பரிந்துரைக்கப்பட்ட நடவடிக்கை',
  'result.ambulanceType': 'பரிந்துரைக்கப்பட்ட ஆம்புலன்ஸ் வகை',
  'result.viewSummary': 'சுருக்கத்தை காண்க',

  'ambulance.basic': 'அடிப்படை உயிர் ஆதரவு',
  'ambulance.cardiac': 'இதய உயிர் ஆதரவு',
  'ambulance.trauma': 'டிராமா ஆம்புலன்ஸ்',

  'summary.title': 'அனுப்பும் சுருக்கம்',
  'summary.subtitle': 'இந்த தகவலை அவசர சேவைகளுடன் பகிரவும்',
  'summary.incidentType': 'நிகழ்வு வகை',
  'summary.ageGroup': 'வயது குழு',
  'summary.conscious': 'உணர்வு',
  'summary.location': 'இடம்',
  'summary.ambulanceType': 'ஆம்புலன்ஸ் வகை',
  'summary.preArrivalNote': 'வருகைக்கு முன் குறிப்பு',
  'summary.call': 'அழைக்கவும்',
  'summary.copy': 'நகலெடுக்கவும்',
  'summary.share': 'பகிரவும்',
  'summary.copied': 'நகலெடுக்கப்பட்டது',
  'summary.viewTips': 'காத்திருக்கும்போது பாதுகாப்பு குறிப்புகள்',
  'summary.disclaimer': 'இந்த கருவி மருத்துவ கண்டறிதலை வழங்காது.',
  'summary.patientLocation': 'நோயாளர் இருப்பிடம்',

  'waiting.title': 'உதவி வரும் வழியில்',
  'waiting.subtitle': 'காத்திருக்கும்போது செய்ய வேண்டியவை',
  'waiting.stayCalmTitle': 'அமைதியாக இருங்கள்',
  'waiting.stayCalmDesc': 'மெதுவாக ஆழமாக சுவாசிக்கவும்.',
  'waiting.keepStillTitle': 'நோயாளியை அசையாமல் வையுங்கள்',
  'waiting.keepStillDesc': 'உடனடி ஆபத்து இல்லையெனில் நகர்த்த வேண்டாம்.',
  'waiting.followTitle': 'வழிமுறைகளை பின்பற்றவும்',
  'waiting.followDesc': 'அவசர சேவைகளின் அறிவுறுத்தல்களை பின்பற்றவும்.',
  'waiting.notice': 'இவை பொதுவான வழிகாட்டுதல்கள்.',
  'waiting.startOver': 'மீண்டும் தொடங்கவும்',

  'footer.disclaimer': 'இந்த கருவி மருத்துவ ஆலோசனை வழங்காது.',
  'footer.copyright': 'எமர்ஜென்சி ட்ரையாஜ் அசிஸ்டென்ட் • MVP',

  'a11y.urgencyAnnouncement': 'மதிப்பீடு முடிந்தது. அவசர நிலை:',
  'a11y.skipToMain': 'முக்கிய உள்ளடக்கத்திற்கு செல்லவும்',
  'a11y.progressAnnouncement': '{total} இல் {current} கேள்வி',

  'form.chooseAnyOne':
  'என்ன நடந்தது என்பதை கீழுள்ள எந்த ஒரு விருப்பத்தையும் தேர்வு செய்து கூறலாம்.',
'form.voiceOptional':
  'அல்லது ஒரு சிறிய குரல் விளக்கத்தை பதிவு செய்யலாம் (விருப்பத் தேர்வு).',
'form.startRecording': 'பதிவு தொடங்கு',
'form.stopRecording': 'பதிவு நிறுத்து',
'form.photoOptional':
  'அல்லது புகைப்படத்தை பதிவேற்று / எடுத்துக்கொள்ளலாம் (விருப்பத் தேர்வு).',
'form.uploadOrCapture': 'புகைப்படத்தை பதிவேற்று அல்லது எடுத்துக்கொள்',
'form.photoPreviewAlt': 'தேர்ந்தெடுத்த புகைப்படத்தின் முன்னோட்டம்',
'form.describeWhatHappened': 'என்ன நடந்தது என்பதை விளக்குங்கள்',
'form.describePlaceholder':
  'அவசர நிலை குறித்து கூடுதல் விவரங்களை உள்ளிடுங்கள்...',
'form.optional': 'விருப்பத் தேர்வு',
'form.atLeastOneRequired':
  'குறைந்தபட்சம் ஒன்றைத் தேர்வு செய்யவும்: விரைவு விருப்பம், குரல் குறிப்பு, புகைப்படம் அல்லது செய்தி.',
'conscious.yesDesc': 'நோயாளர் விழிப்புடன் இருந்து பதில் அளிக்கிறார்',
'conscious.noDesc': 'நோயாளர் பதில் அளிக்காமல் உணர்வு இன்றி உள்ளார்',
'conscious.unsureDesc': 'நோயாளரின் உணர்வு நிலை தெளிவாக இல்லை',

},
bengali: {
  'hero.badge': 'জরুরি সহায়তা',
  'hero.title': 'চিকিৎসা জরুরি অবস্থায় দ্রুত সহায়তা পান',
  'hero.subtitle': 'জরুরি পরিষেবাগুলিকে দ্রুত কাজ করতে সাহায্য করতে কয়েকটি প্রশ্নের উত্তর দিন।',
  'hero.startAssessment': 'জরুরি মূল্যায়ন শুরু করুন',
  'hero.callEmergency': 'জরুরি পরিষেবায় কল করুন',
  'hero.step1': 'কিছু দ্রুত প্রশ্নের উত্তর দিন',
  'hero.step2': 'জরুরি অবস্থা মূল্যায়ন',
  'hero.step3': 'সঠিক সহায়তা পান',

  'form.question': 'প্রশ্ন',
  'form.whatHappened': 'কি হয়েছে?',
  'form.isConscious': 'রোগী কি সচেতন?',
  'form.ageGroup': 'রোগীর বয়সের গ্রুপ?',
  'form.location': 'রোগী কোথায় আছে?',
  'form.locationPlaceholder': 'ঠিকানা লিখুন বা অবস্থান বর্ণনা করুন',
  'form.back': 'ফিরে যান',
  'form.continue': 'চালিয়ে যান',
  'form.getAssessment': 'মূল্যায়ন পান',

  'incident.accident': 'দুর্ঘটনা',
  'incident.collapse': 'হঠাৎ অজ্ঞান',
  'incident.breathing': 'শ্বাসকষ্ট',
  'incident.bleeding': 'অতিরিক্ত রক্তপাত',
  'incident.other': 'অন্যান্য',

  'conscious.yes': 'হ্যাঁ',
  'conscious.no': 'না',
  'conscious.unsure': 'নিশ্চিত নই',

  'age.child': 'শিশু',
  'age.adult': 'প্রাপ্তবয়স্ক',
  'age.elderly': 'বৃদ্ধ',

  'result.emergency': 'জরুরি',
  'result.urgent': 'তাৎক্ষণিক',
  'result.nonEmergency': 'জরুরি নয়',

  'result.emergencyExplanation': 'আপনার উত্তরের ভিত্তিতে অবিলম্বে চিকিৎসা সহায়তা প্রয়োজন।',
  'result.urgentExplanation': 'এই অবস্থায় দ্রুত চিকিৎসা মনোযোগ দরকার।',
  'result.nonEmergencyExplanation': 'অবস্থা স্থিতিশীল, তবে পর্যবেক্ষণ প্রয়োজন।',

  'result.emergencyRecommendation': 'অবিলম্বে জরুরি পরিষেবায় কল করুন',
  'result.urgentRecommendation': 'যত তাড়াতাড়ি সম্ভব চিকিৎসা নিন',
  'result.nonEmergencyRecommendation': 'স্বাস্থ্যসেবা প্রদানকারীর সাথে যোগাযোগ করুন',

  'result.recommendedAction': 'প্রস্তাবিত পদক্ষেপ',
  'result.ambulanceType': 'প্রস্তাবিত অ্যাম্বুলেন্স প্রকার',
  'result.viewSummary': 'ডিসপ্যাচ সারাংশ দেখুন',

  'ambulance.basic': 'মৌলিক জীবন সহায়তা',
  'ambulance.cardiac': 'কার্ডিয়াক জীবন সহায়তা',
  'ambulance.trauma': 'ট্রমা অ্যাম্বুলেন্স',

  'summary.title': 'ডিসপ্যাচ সারাংশ',
  'summary.subtitle': 'এই তথ্য জরুরি পরিষেবার সাথে শেয়ার করুন',
  'summary.incidentType': 'ঘটনার ধরন',
  'summary.ageGroup': 'বয়স গ্রুপ',
  'summary.conscious': 'সচেতনতা',
  'summary.location': 'অবস্থান',
  'summary.ambulanceType': 'অ্যাম্বুলেন্স প্রকার',
  'summary.preArrivalNote': 'আগমনের আগে নোট',
  'summary.call': 'কল করুন',
  'summary.copy': 'কপি করুন',
  'summary.share': 'শেয়ার করুন',
  'summary.copied': 'কপি হয়েছে',
  'summary.viewTips': 'অপেক্ষার সময় নিরাপত্তা টিপস দেখুন',
  'summary.disclaimer': 'এই টুল চিকিৎসা নির্ণয় প্রদান করে না।',
  'summary.patientLocation': 'রোগীর অবস্থান',

  'waiting.title': 'সহায়তা পথে রয়েছে',
  'waiting.subtitle': 'অপেক্ষা করার সময় আপনি যা করতে পারেন',
  'waiting.stayCalmTitle': 'শান্ত থাকুন',
  'waiting.stayCalmDesc': 'ধীরে এবং গভীরভাবে শ্বাস নিন।',
  'waiting.keepStillTitle': 'রোগীকে স্থির রাখুন',
  'waiting.keepStillDesc': 'তাৎক্ষণিক বিপদ না থাকলে সরাবেন না।',
  'waiting.followTitle': 'নির্দেশনা অনুসরণ করুন',
  'waiting.followDesc': 'জরুরি পরিষেবার নির্দেশনা অনুসরণ করুন।',
  'waiting.notice': 'এগুলি সাধারণ নির্দেশিকা।',
  'waiting.startOver': 'আবার শুরু করুন',

  'footer.disclaimer': 'এই টুল চিকিৎসা পরামর্শ দেয় না।',
  'footer.copyright': 'এমার্জেন্সি ট্রায়েজ সহকারী • MVP',

  'a11y.urgencyAnnouncement': 'মূল্যায়ন সম্পন্ন। জরুরি স্তর:',
  'a11y.skipToMain': 'মূল বিষয়বস্তুতে যান',
  'a11y.progressAnnouncement': '{total} এর মধ্যে {current} প্রশ্ন',

  'form.chooseAnyOne':
  'কি হয়েছে তা বোঝাতে নিচের যেকোনো একটি অপশন বেছে নিতে পারেন।',
'form.voiceOptional':
  'অথবা একটি ছোট ভয়েস বর্ণনা রেকর্ড করতে পারেন (ঐচ্ছিক)।',
'form.startRecording': 'রেকর্ডিং শুরু করুন',
'form.stopRecording': 'রেকর্ডিং বন্ধ করুন',
'form.photoOptional':
  'অথবা ছবি আপলোড / ক্যাপচার করুন (ঐচ্ছিক)।',
'form.uploadOrCapture': 'ছবি আপলোড বা ক্যাপচার করুন',
'form.photoPreviewAlt': 'নির্বাচিত ছবির প্রিভিউ',
'form.describeWhatHappened': 'কি হয়েছে তা লিখুন',
'form.describePlaceholder':
  'জরুরি অবস্থার বিষয়ে অতিরিক্ত বিস্তারিত লিখুন...',
'form.optional': 'ঐচ্ছিক',
'form.atLeastOneRequired':
  'কমপক্ষে একটি বেছে নিন: কুইক অপশন, ভয়েস নোট, ছবি বা মেসেজ।',
'conscious.yesDesc': 'রোগী জেগে আছে এবং সাড়া দিচ্ছে',
'conscious.noDesc': 'রোগী অচেতন, কোনো সাড়া নেই',
'conscious.unsureDesc': 'রোগীর চেতনা সম্পর্কে নিশ্চিত নন',

},
marathi: {
  'hero.badge': 'आपत्कालीन मदत',
  'hero.title': 'वैद्यकीय आपत्कालीन परिस्थितीत त्वरित मदत मिळवा',
  'hero.subtitle': 'आपत्कालीन सेवा जलद कार्य करण्यासाठी काही प्रश्नांची उत्तरे द्या.',
  'hero.startAssessment': 'आपत्कालीन मूल्यांकन सुरू करा',
  'hero.callEmergency': 'आपत्कालीन सेवांना कॉल करा',
  'hero.step1': 'काही जलद प्रश्नांची उत्तरे द्या',
  'hero.step2': 'तातडीचे मूल्यांकन',
  'hero.step3': 'योग्य मदत मिळवा',

  'form.question': 'प्रश्न',
  'form.whatHappened': 'काय झाले?',
  'form.isConscious': 'रुग्ण शुद्धीत आहे का?',
  'form.ageGroup': 'रुग्णाचे वय गट?',
  'form.location': 'रुग्ण कुठे आहे?',
  'form.locationPlaceholder': 'पत्ता प्रविष्ट करा किंवा स्थान वर्णन करा',
  'form.back': 'मागे',
  'form.continue': 'सुरू ठेवा',
  'form.getAssessment': 'मूल्यांकन मिळवा',

  'incident.accident': 'अपघात',
  'incident.collapse': 'अचानक कोसळणे',
  'incident.breathing': 'श्वास घेण्याची अडचण',
  'incident.bleeding': 'जास्त रक्तस्त्राव',
  'incident.other': 'इतर',

  'conscious.yes': 'होय',
  'conscious.no': 'नाही',
  'conscious.unsure': 'माहित नाही',

  'age.child': 'मूल',
  'age.adult': 'प्रौढ',
  'age.elderly': 'वृद्ध',

  'result.emergency': 'आपत्कालीन',
  'result.urgent': 'तातडीचे',
  'result.nonEmergency': 'आपत्कालीन नाही',

  'result.emergencyExplanation': 'तुमच्या उत्तरांवरून त्वरित वैद्यकीय मदतीची गरज आहे.',
  'result.urgentExplanation': 'या परिस्थितीत लवकर वैद्यकीय लक्ष आवश्यक आहे.',
  'result.nonEmergencyExplanation': 'परिस्थिती स्थिर आहे, पण निरीक्षण आवश्यक आहे.',

  'result.emergencyRecommendation': 'ताबडतोब आपत्कालीन सेवांना कॉल करा',
  'result.urgentRecommendation': 'लवकरात लवकर वैद्यकीय मदत घ्या',
  'result.nonEmergencyRecommendation': 'आरोग्य सेवा प्रदात्याशी संपर्क साधा',

  'result.recommendedAction': 'शिफारस केलेली कृती',
  'result.ambulanceType': 'शिफारस केलेला रुग्णवाहिकेचा प्रकार',
  'result.viewSummary': 'डिस्पॅच सारांश पहा',

  'ambulance.basic': 'मूलभूत जीवन सहाय्य',
  'ambulance.cardiac': 'हृदय जीवन सहाय्य',
  'ambulance.trauma': 'ट्रॉमा रुग्णवाहिका',

  'summary.title': 'डिस्पॅच सारांश',
  'summary.subtitle': 'ही माहिती आपत्कालीन सेवांसोबत शेअर करा',
  'summary.incidentType': 'घटनेचा प्रकार',
  'summary.ageGroup': 'वय गट',
  'summary.conscious': 'शुद्धी',
  'summary.location': 'स्थान',
  'summary.ambulanceType': 'रुग्णवाहिकेचा प्रकार',
  'summary.preArrivalNote': 'आगमनापूर्वीची नोंद',
  'summary.call': 'कॉल करा',
  'summary.copy': 'सारांश कॉपी करा',
  'summary.share': 'शेअर करा',
  'summary.copied': 'कॉपी झाले',
  'summary.viewTips': 'प्रतीक्षेदरम्यान सुरक्षा सूचना पहा',
  'summary.disclaimer': 'हे साधन वैद्यकीय निदान देत नाही.',
  'summary.patientLocation': 'रुग्णाचे स्थान',

  'waiting.title': 'मदत येत आहे',
  'waiting.subtitle': 'प्रतीक्षा करताना तुम्ही हे करू शकता',
  'waiting.stayCalmTitle': 'शांत राहा',
  'waiting.stayCalmDesc': 'हळू आणि खोल श्वास घ्या.',
  'waiting.keepStillTitle': 'रुग्णाला स्थिर ठेवा',
  'waiting.keepStillDesc': 'तत्काळ धोका नसल्यास हलवू नका.',
  'waiting.followTitle': 'सूचनांचे पालन करा',
  'waiting.followDesc': 'आपत्कालीन सेवांच्या सूचनांचे पालन करा.',
  'waiting.notice': 'या सामान्य सूचना आहेत.',
  'waiting.startOver': 'पुन्हा सुरू करा',

  'footer.disclaimer': 'हे साधन वैद्यकीय सल्ला देत नाही.',
  'footer.copyright': 'एमर्जन्सी ट्रायेज सहाय्यक • MVP',

  'a11y.urgencyAnnouncement': 'मूल्यांकन पूर्ण. तातडीची पातळी:',
  'a11y.skipToMain': 'मुख्य मजकुरावर जा',
  'a11y.progressAnnouncement': '{total} पैकी {current} प्रश्न',

  'form.chooseAnyOne':
  'काय झाले आहे हे सांगण्यासाठी खालील पैकी कोणताही एक पर्याय निवडा.',
'form.voiceOptional':
  'किंवा छोटासा व्हॉईस वर्णन रेकॉर्ड करा (पर्यायी).',
'form.startRecording': 'रेकॉर्डिंग सुरू करा',
'form.stopRecording': 'रेकॉर्डिंग थांबवा',
'form.photoOptional':
  'किंवा फोटो अपलोड / कॅप्चर करा (पर्यायी).',
'form.uploadOrCapture': 'फोटो अपलोड किंवा कॅप्चर करा',
'form.photoPreviewAlt': 'निवडलेल्या फोटोचा पूर्वावलोकन',
'form.describeWhatHappened': 'काय झाले ते लिहा',
'form.describePlaceholder':
  'आपत्कालीन परिस्थितीबद्दल अधिक माहिती द्या...',
'form.optional': 'पर्यायी',
'form.atLeastOneRequired':
  'किमान एक पर्याय निवडा: क्विक पर्याय, व्हॉईस नोट, फोटो किंवा संदेश.',
'conscious.yesDesc': 'रुग्ण जागा आहे आणि प्रतिसाद देत आहे',
'conscious.noDesc': 'रुग्ण बेशुद्ध आहे, प्रतिसाद नाही',
'conscious.unsureDesc': 'रुग्ण शुद्धीवर आहे की नाही, निश्चित सांगता येत नाही',

},
gujarati: {
  'hero.badge': 'આપાતકાલીન સહાય',
  'hero.title': 'ચિકિત્સા આપાતકાળ દરમિયાન ઝડપથી મદદ મેળવો',
  'hero.subtitle': 'આપાત સેવાઓ ઝડપથી કાર્ય કરે તે માટે થોડા પ્રશ્નોના જવાબ આપો.',
  'hero.startAssessment': 'આપાત મૂલ્યાંકન શરૂ કરો',
  'hero.callEmergency': 'આપાત સેવાઓને કોલ કરો',
  'hero.step1': 'થોડા ઝડપી પ્રશ્નોના જવાબ આપો',
  'hero.step2': 'તાત્કાલિકતાનું મૂલ્યાંકન',
  'hero.step3': 'યોગ્ય સહાય મેળવો',

  'form.question': 'પ્રશ્ન',
  'form.whatHappened': 'શું થયું?',
  'form.isConscious': 'શું દર્દી સચેત છે?',
  'form.ageGroup': 'દર્દીનો વય જૂથ?',
  'form.location': 'દર્દી ક્યાં છે?',
  'form.locationPlaceholder': 'સરનામું દાખલ કરો અથવા સ્થાન વર્ણવો',
  'form.back': 'પાછા',
  'form.continue': 'ચાલુ રાખો',
  'form.getAssessment': 'મૂલ્યાંકન મેળવો',

  'incident.accident': 'અકસ્માત',
  'incident.collapse': 'અચાનક ધરાશાયી',
  'incident.breathing': 'શ્વાસની સમસ્યા',
  'incident.bleeding': 'ભારે રક્તસ્ત્રાવ',
  'incident.other': 'અન્ય',

  'conscious.yes': 'હા',
  'conscious.no': 'ના',
  'conscious.unsure': 'ખાતરી નથી',

  'age.child': 'બાળક',
  'age.adult': 'પ્રૌઢ',
  'age.elderly': 'વૃદ્ધ',

  'result.emergency': 'આપાત',
  'result.urgent': 'તાત્કાલિક',
  'result.nonEmergency': 'આપાત નથી',

  'result.emergencyExplanation': 'તમારા જવાબો આધારે તાત્કાલિક તબીબી સહાય જરૂરી છે.',
  'result.urgentExplanation': 'આ સ્થિતિમાં ઝડપી તબીબી ધ્યાન જરૂરી છે.',
  'result.nonEmergencyExplanation': 'પરિસ્થિતિ સ્થિર છે, પરંતુ દેખરેખ જરૂરી છે.',

  'result.emergencyRecommendation': 'તાત્કાલિક આપાત સેવાઓને કોલ કરો',
  'result.urgentRecommendation': 'શીઘ્ર તબીબી સહાય મેળવો',
  'result.nonEmergencyRecommendation': 'આરોગ્ય સેવા પ્રદાતાને સંપર્ક કરો',

  'result.recommendedAction': 'ભલામણ કરેલ કાર્યવાહી',
  'result.ambulanceType': 'ભલામણ કરેલ એમ્બ્યુલન્સ પ્રકાર',
  'result.viewSummary': 'ડિસ્પેચ સારાંશ જુઓ',

  'ambulance.basic': 'મૂળભૂત જીવન સહાય',
  'ambulance.cardiac': 'હૃદય જીવન સહાય',
  'ambulance.trauma': 'ટ્રોમા એમ્બ્યુલન્સ',

  'summary.title': 'ડિસ્પેચ સારાંશ',
  'summary.subtitle': 'આ માહિતી આપાત સેવાઓ સાથે શેર કરો',
  'summary.incidentType': 'ઘટનાનો પ્રકાર',
  'summary.ageGroup': 'વય જૂથ',
  'summary.conscious': 'સચેતતા',
  'summary.location': 'સ્થાન',
  'summary.ambulanceType': 'એમ્બ્યુલન્સ પ્રકાર',
  'summary.preArrivalNote': 'આગમન પૂર્વ નોંધ',
  'summary.call': 'કોલ કરો',
  'summary.copy': 'કૉપી કરો',
  'summary.share': 'શેર કરો',
  'summary.copied': 'કૉપી થયું',
  'summary.viewTips': 'પ્રતીક્ષા દરમિયાન સુરક્ષા સૂચનો જુઓ',
  'summary.disclaimer': 'આ સાધન તબીબી નિદાન આપતું નથી.',
  'summary.patientLocation': 'દર્દીનું સ્થાન',

  'waiting.title': 'મદદ આવી રહી છે',
  'waiting.subtitle': 'પ્રતીક્ષા દરમિયાન તમે આ કરી શકો છો',
  'waiting.stayCalmTitle': 'શાંત રહો',
  'waiting.stayCalmDesc': 'ધીમે અને ઊંડા શ્વાસ લો.',
  'waiting.keepStillTitle': 'દર્દીને સ્થિર રાખો',
  'waiting.keepStillDesc': 'તાત્કાલિક જોખમ ન હોય તો હલાવશો નહીં.',
  'waiting.followTitle': 'સૂચનાઓ અનુસરો',
  'waiting.followDesc': 'આપાત સેવાઓની સૂચનાઓ અનુસરો.',
  'waiting.notice': 'આ સામાન્ય માર્ગદર્શન છે.',
  'waiting.startOver': 'ફરી શરૂ કરો',

  'footer.disclaimer': 'આ સાધન તબીબી સલાહ આપતું નથી.',
  'footer.copyright': 'એમર્જન્સી ટ્રાયેજ સહાયક • MVP',

  'a11y.urgencyAnnouncement': 'મૂલ્યાંકન પૂર્ણ. તાત્કાલિક સ્તર:',
  'a11y.skipToMain': 'મુખ્ય સામગ્રી પર જાઓ',
  'a11y.progressAnnouncement': '{total} માંથી {current} પ્રશ્ન',

  'form.chooseAnyOne':
  'શું થયું છે તે બતાવવા માટે નીચેના કોઈપણ એક વિકલ્પ પસંદ કરી શકો છો.',
'form.voiceOptional':
  'અથવા નાનું વૉઇસ વર્ણન રેકોર્ડ કરો (વૈકલ્પિક).',
'form.startRecording': 'રેકોર્ડિંગ શરૂ કરો',
'form.stopRecording': 'રેકોર્ડિંગ બંધ કરો',
'form.photoOptional':
  'અથવા ફોટો અપલોડ / કેપ્ચર કરો (વૈકલ્પિક).',
'form.uploadOrCapture': 'ફોટો અપલોડ અથવા કેપ્ચર કરો',
'form.photoPreviewAlt': 'પસંદ કરેલા ફોટોનું પૂર્વાવલોકન',
'form.describeWhatHappened': 'શું થયું તે લખો',
'form.describePlaceholder':
  'આપત્કાલીન સ્થિતિ વિશે વધારાની વિગતો લખો...',
'form.optional': 'વૈકલ્પિક',
'form.atLeastOneRequired':
  'ઓછામાં ઓછો એક પસંદ કરો: ક્વિક વિકલ્પ, વૉઇસ નોટ, ફોટો અથવા સંદેશ.',
'conscious.yesDesc': 'રોગી જાગૃત છે અને પ્રતિસાદ આપી રહ્યો છે',
'conscious.noDesc': 'રોગી બેભાન છે, કોઈ પ્રતિસાદ નથી',
'conscious.unsureDesc': 'રોગી જાગૃત છે કે નહિ તે સ્પષ્ટ નથી',

},
kannada: {
  'hero.badge': 'ತುರ್ತು ಸಹಾಯ',
  'hero.title': 'ವೈದ್ಯಕೀಯ ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ ತಕ್ಷಣ ಸಹಾಯ ಪಡೆಯಿರಿ',
  'hero.subtitle': 'ತುರ್ತು ಸೇವೆಗಳು ವೇಗವಾಗಿ ಪ್ರತಿಕ್ರಿಯಿಸಲು ಕೆಲವು ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ.',
  'hero.startAssessment': 'ತುರ್ತು ಮೌಲ್ಯಮಾಪನ ಆರಂಭಿಸಿ',
  'hero.callEmergency': 'ತುರ್ತು ಸೇವೆಗಳಿಗೆ ಕರೆಮಾಡಿ',
  'hero.step1': 'ಕೆಲವು ವೇಗದ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ',
  'hero.step2': 'ತೀವ್ರತೆಯನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ',
  'hero.step3': 'ಸರಿಯಾದ ಸಹಾಯ ಪಡೆಯಿರಿ',

  'form.question': 'ಪ್ರಶ್ನೆ',
  'form.whatHappened': 'ಏನು ನಡೆಯಿತು?',
  'form.isConscious': 'ರೋಗಿ ಚೇತನದಲ್ಲಿದ್ದಾನೆಯೇ?',
  'form.ageGroup': 'ರೋಗಿಯ ವಯಸ್ಸಿನ ಗುಂಪು?',
  'form.location': 'ರೋಗಿ ಎಲ್ಲಿದ್ದಾನೆ?',
  'form.locationPlaceholder': 'ವಿಳಾಸ ನಮೂದಿಸಿ ಅಥವಾ ಸ್ಥಳವನ್ನು ವಿವರಿಸಿ',
  'form.back': 'ಹಿಂದೆ',
  'form.continue': 'ಮುಂದುವರಿಸಿ',
  'form.getAssessment': 'ಮೌಲ್ಯಮಾಪನ ಪಡೆಯಿರಿ',

  'incident.accident': 'ಅಪಘಾತ',
  'incident.collapse': 'ಅಕಸ್ಮಿಕ ಕುಸಿತ',
  'incident.breathing': 'ಉಸಿರಾಟದ ಸಮಸ್ಯೆ',
  'incident.bleeding': 'ತೀವ್ರ ರಕ್ತಸ್ರಾವ',
  'incident.other': 'ಇತರೆ',

  'conscious.yes': 'ಹೌದು',
  'conscious.no': 'ಇಲ್ಲ',
  'conscious.unsure': 'ಗೊತ್ತಿಲ್ಲ',

  'age.child': 'ಮಗು',
  'age.adult': 'ವಯಸ್ಕ',
  'age.elderly': 'ವೃದ್ಧ',

  'result.emergency': 'ತುರ್ತು',
  'result.urgent': 'ತಕ್ಷಣ',
  'result.nonEmergency': 'ತುರ್ತು ಅಲ್ಲ',

  'result.emergencyExplanation': 'ನಿಮ್ಮ ಉತ್ತರಗಳ ಆಧಾರದ ಮೇಲೆ ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಅಗತ್ಯವಿದೆ.',
  'result.urgentExplanation': 'ಈ ಪರಿಸ್ಥಿತಿಗೆ ಶೀಘ್ರ ವೈದ್ಯಕೀಯ ಗಮನ ಅಗತ್ಯವಿದೆ.',
  'result.nonEmergencyExplanation': 'ಪರಿಸ್ಥಿತಿ ಸ್ಥಿರವಾಗಿದೆ, ಆದರೆ ಮೇಲ್ವಿಚಾರಣೆ ಅಗತ್ಯವಿದೆ.',

  'result.emergencyRecommendation': 'ತಕ್ಷಣ ತುರ್ತು ಸೇವೆಗಳಿಗೆ ಕರೆಮಾಡಿ',
  'result.urgentRecommendation': 'ಶೀಘ್ರ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಿರಿ',
  'result.nonEmergencyRecommendation': 'ಆರೋಗ್ಯ ಸೇವಾ ಒದಗಿಸುವವರನ್ನು ಸಂಪರ್ಕಿಸಿ',

  'result.recommendedAction': 'ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ',
  'result.ambulanceType': 'ಶಿಫಾರಸು ಮಾಡಿದ ಆಂಬ್ಯುಲೆನ್ಸ್ ಪ್ರಕಾರ',
  'result.viewSummary': 'ಡಿಸ್ಪ್ಯಾಚ್ ಸಾರಾಂಶ ನೋಡಿ',

  'ambulance.basic': 'ಮೂಲ ಜೀವ ಬೆಂಬಲ',
  'ambulance.cardiac': 'ಹೃದಯ ಜೀವ ಬೆಂಬಲ',
  'ambulance.trauma': 'ಟ್ರಾಮಾ ಆಂಬ್ಯುಲೆನ್ಸ್',

  'summary.title': 'ಡಿಸ್ಪ್ಯಾಚ್ ಸಾರಾಂಶ',
  'summary.subtitle': 'ಈ ಮಾಹಿತಿಯನ್ನು ತುರ್ತು ಸೇವೆಗಳೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ',
  'summary.incidentType': 'ಘಟನೆಯ ಪ್ರಕಾರ',
  'summary.ageGroup': 'ವಯಸ್ಸಿನ ಗುಂಪು',
  'summary.conscious': 'ಚೇತನತೆ',
  'summary.location': 'ಸ್ಥಳ',
  'summary.ambulanceType': 'ಆಂಬ್ಯುಲೆನ್ಸ್ ಪ್ರಕಾರ',
  'summary.preArrivalNote': 'ಬರುವ ಮೊದಲು ಟಿಪ್ಪಣಿ',
  'summary.call': 'ಕರೆಮಾಡಿ',
  'summary.copy': 'ನಕಲಿಸಿ',
  'summary.share': 'ಹಂಚಿಕೊಳ್ಳಿ',
  'summary.copied': 'ನಕಲಾಯಿತು',
  'summary.viewTips': 'ಕಾದಿರುವಾಗ ಸುರಕ್ಷತಾ ಸಲಹೆಗಳು',
  'summary.disclaimer': 'ಈ ಸಾಧನ ವೈದ್ಯಕೀಯ ನಿರ್ಣಯ ನೀಡುವುದಿಲ್ಲ.',
  'summary.patientLocation': 'ರೋಗಿಯ ಸ್ಥಳ',

  'waiting.title': 'ಸಹಾಯ ಬರುತ್ತಿದೆ',
  'waiting.subtitle': 'ಕಾದಿರುವಾಗ ನೀವು ಮಾಡಬಹುದಾದವುಗಳು',
  'waiting.stayCalmTitle': 'ಶಾಂತವಾಗಿರಿ',
  'waiting.stayCalmDesc': 'ನಿಧಾನವಾಗಿ ಆಳವಾಗಿ ಉಸಿರೆಳೆಯಿರಿ.',
  'waiting.keepStillTitle': 'ರೋಗಿಯನ್ನು ಸ್ಥಿರವಾಗಿಡಿ',
  'waiting.keepStillDesc': 'ತಕ್ಷಣದ ಅಪಾಯವಿಲ್ಲದಿದ್ದರೆ ಸ್ಥಳಾಂತರಿಸಬೇಡಿ.',
  'waiting.followTitle': 'ಸೂಚನೆಗಳನ್ನು ಅನುಸರಿಸಿ',
  'waiting.followDesc': 'ತುರ್ತು ಸೇವೆಗಳ ಸೂಚನೆಗಳನ್ನು ಪಾಲಿಸಿ.',
  'waiting.notice': 'ಇವು ಸಾಮಾನ್ಯ ಮಾರ್ಗಸೂಚಿಗಳು.',
  'waiting.startOver': 'ಮತ್ತೆ ಆರಂಭಿಸಿ',

  'footer.disclaimer': 'ಈ ಸಾಧನ ವೈದ್ಯಕೀಯ ಸಲಹೆ ನೀಡುವುದಿಲ್ಲ.',
  'footer.copyright': 'ಎಮರ್ಜೆನ್ಸಿ ಟ್ರೈಯೇಜ್ ಸಹಾಯಕ • MVP',

  'a11y.urgencyAnnouncement': 'ಮೌಲ್ಯಮಾಪನ ಪೂರ್ಣಗೊಂಡಿದೆ. ತುರ್ತು ಮಟ್ಟ:',
  'a11y.skipToMain': 'ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ಹೋಗಿ',
  'a11y.progressAnnouncement': '{total}ರಲ್ಲಿ {current} ಪ್ರಶ್ನೆ',

  'form.chooseAnyOne':
  'ಏನು ಸಂಭವಿಸಿದೆ ಎಂದು ಹೇಳಲು ಕೆಳಗಿನ ಯಾವುದಾದರೂ ಒಂದು ಆಯ್ಕೆಯನ್ನು ಆರಿಸಬಹುದು.',
'form.voiceOptional':
  'ಅಥವಾ ಚಿಕ್ಕ ವಾಯ್ಸ್ ವರ್ಣನೆಯನ್ನು ರೆಕಾರ್ಡ್ ಮಾಡಿ (ಐಚ್ಛಿಕ).',
'form.startRecording': 'ರೆಕಾರ್ಡಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ',
'form.stopRecording': 'ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ',
'form.photoOptional':
  'ಅಥವಾ ಫೋಟೋ ಅಪ್ಲೋಡ್ / ಕ್ಯಾಪ್ಚರ್ ಮಾಡಿ (ಐಚ್ಛಿಕ).',
'form.uploadOrCapture': 'ಫೋಟೋ ಅಪ್ಲೋಡ್ ಅಥವಾ ಕ್ಯಾಪ್ಚರ್ ಮಾಡಿ',
'form.photoPreviewAlt': 'ಆಯ್ಕೆ ಮಾಡಿದ ಫೋಟೋದ ಪೂರ್ವದೃಶ್ಯ',
'form.describeWhatHappened': 'ಏನು ಸಂಭವಿಸಿದೆ ಎಂದು ವಿವರಿಸಿ',
'form.describePlaceholder':
  'ತುರ್ತು ಪರಿಸ್ಥಿತಿಯ ಬಗ್ಗೆ ಹೆಚ್ಚಿನ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ...',
'form.optional': 'ಐಚ್ಛಿಕ',
'form.atLeastOneRequired':
  'ಕನಿಷ್ಠ ಒಂದು ಆಯ್ಕೆ ಮಾಡಿ: ಕ್ವಿಕ್ ಆಯ್ಕೆ, ವಾಯ್ಸ್ ನೋಟ, ಫೋಟೋ ಅಥವಾ ಸಂದೇಶ.',
'conscious.yesDesc': 'ರೋಗಿ ಎಚ್ಚರದಲ್ಲಿದ್ದು ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತಿದ್ದಾರೆ',
'conscious.noDesc': 'ರೋಗಿ ಪ್ರತಿಕ್ರಿಯಿಸದೆ ಅಚೇತನ ಸ್ಥಿತಿಯಲ್ಲಿ ಇದ್ದಾರೆ',
'conscious.unsureDesc': 'ರೋಗಿ ಎಚ್ಚರದಲ್ಲಿರುವುದನ್ನು ಖಚಿತವಾಗಿ ಹೇಳಲಾಗುವುದಿಲ್ಲ',

},
malayalam: {
  'hero.badge': 'അത്യാഹിത സഹായം',
  'hero.title': 'വൈദ്യസംബന്ധമായ അടിയന്തരാവസ്ഥയിൽ വേഗത്തിൽ സഹായം നേടുക',
  'hero.subtitle': 'അത്യാഹിത സേവനങ്ങൾ വേഗത്തിൽ പ്രതികരിക്കാൻ ചില ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുക.',
  'hero.startAssessment': 'അത്യാഹിത വിലയിരുത്തൽ ആരംഭിക്കുക',
  'hero.callEmergency': 'അത്യാഹിത സേവനങ്ങൾക്ക് വിളിക്കുക',
  'hero.step1': 'വേഗത്തിലുള്ള ചില ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുക',
  'hero.step2': 'തീവ്രത വിലയിരുത്തുക',
  'hero.step3': 'ശരിയായ സഹായം നേടുക',

  'form.question': 'ചോദ്യം',
  'form.whatHappened': 'എന്ത് സംഭവിച്ചു?',
  'form.isConscious': 'രോഗിക്ക് ബോധമുണ്ടോ?',
  'form.ageGroup': 'രോഗിയുടെ പ്രായ വിഭാഗം?',
  'form.location': 'രോഗി എവിടെയാണ്?',
  'form.locationPlaceholder': 'വിലാസം നൽകുക അല്ലെങ്കിൽ സ്ഥലം വിവരിക്കുക',
  'form.back': 'തിരികെ',
  'form.continue': 'തുടരുക',
  'form.getAssessment': 'വിലയിരുത്തൽ നേടുക',

  'incident.accident': 'അപകടം',
  'incident.collapse': 'പെട്ടെന്ന് വീഴൽ',
  'incident.breathing': 'ശ്വാസ പ്രശ്നം',
  'incident.bleeding': 'കഠിന രക്തസ്രാവം',
  'incident.other': 'മറ്റുള്ളവ',

  'conscious.yes': 'അതെ',
  'conscious.no': 'ഇല്ല',
  'conscious.unsure': 'ഉറപ്പില്ല',

  'age.child': 'കുട്ടി',
  'age.adult': 'വയസ്കൻ',
  'age.elderly': 'മുതിർന്നവർ',

  'result.emergency': 'അത്യാഹിതം',
  'result.urgent': 'അടിയന്തിരം',
  'result.nonEmergency': 'അത്യാഹിതമല്ല',

  'result.emergencyExplanation': 'നിങ്ങളുടെ ഉത്തരങ്ങൾ പ്രകാരം ഉടൻ വൈദ്യസഹായം ആവശ്യമാണ്.',
  'result.urgentExplanation': 'ഈ അവസ്ഥയ്ക്ക് വേഗത്തിൽ വൈദ്യ ശ്രദ്ധ ആവശ്യമാണ്.',
  'result.nonEmergencyExplanation': 'സ്ഥിതി സ്ഥിരമാണെങ്കിലും നിരീക്ഷണം ആവശ്യമാണ്.',

  'result.emergencyRecommendation': 'ഉടൻ അത്യാഹിത സേവനങ്ങൾക്ക് വിളിക്കുക',
  'result.urgentRecommendation': 'വേഗത്തിൽ വൈദ്യസഹായം നേടുക',
  'result.nonEmergencyRecommendation': 'ആരോഗ്യ സേവനദാതാവിനെ സമീപിക്കുക',

  'result.recommendedAction': 'ശുപാർശ ചെയ്ത നടപടി',
  'result.ambulanceType': 'ശുപാർശ ചെയ്ത ആംബുലൻസ് തരം',
  'result.viewSummary': 'ഡിസ്‌പാച്ച് സംഗ്രഹം കാണുക',

  'ambulance.basic': 'അടിസ്ഥാന ജീവൻ സഹായം',
  'ambulance.cardiac': 'ഹൃദയ ജീവൻ സഹായം',
  'ambulance.trauma': 'ട്രോമ ആംബുലൻസ്',

  'summary.title': 'ഡിസ്‌പാച്ച് സംഗ്രഹം',
  'summary.subtitle': 'ഈ വിവരങ്ങൾ അത്യാഹിത സേവനങ്ങളുമായി പങ്കിടുക',
  'summary.incidentType': 'സംഭവ തരം',
  'summary.ageGroup': 'പ്രായ വിഭാഗം',
  'summary.conscious': 'ബോധാവസ്ഥ',
  'summary.location': 'സ്ഥലം',
  'summary.ambulanceType': 'ആംബുലൻസ് തരം',
  'summary.preArrivalNote': 'എത്തുന്നതിന് മുൻപുള്ള കുറിപ്പ്',
  'summary.call': 'വിളിക്കുക',
  'summary.copy': 'പകർപ്പെടുക്കുക',
  'summary.share': 'പങ്കിടുക',
  'summary.copied': 'പകർന്നു',
  'summary.viewTips': 'കാത്തിരിക്കുമ്പോൾ സുരക്ഷാ നിർദ്ദേശങ്ങൾ',
  'summary.disclaimer': 'ഈ ഉപകരണം വൈദ്യ നിർണയം നൽകുന്നില്ല.',
  'summary.patientLocation': 'രോഗിയുടെ സ്ഥലം',

  'waiting.title': 'സഹായം വരുന്നു',
  'waiting.subtitle': 'കാത്തിരിക്കുമ്പോൾ നിങ്ങൾ ചെയ്യാവുന്ന കാര്യങ്ങൾ',
  'waiting.stayCalmTitle': 'ശാന്തരാവുക',
  'waiting.stayCalmDesc': 'മന്ദഗതിയിൽ ആഴത്തിൽ ശ്വസിക്കുക.',
  'waiting.keepStillTitle': 'രോഗിയെ അനക്കാതെ വയ്ക്കുക',
  'waiting.keepStillDesc': 'തൽക്ഷണ അപകടമില്ലെങ്കിൽ നീക്കരുത്.',
  'waiting.followTitle': 'നിർദ്ദേശങ്ങൾ പാലിക്കുക',
  'waiting.followDesc': 'അത്യാഹിത സേവനങ്ങളുടെ നിർദ്ദേശങ്ങൾ പാലിക്കുക.',
  'waiting.notice': 'ഇവ പൊതുവായ മാർഗനിർദ്ദേശങ്ങളാണ്.',
  'waiting.startOver': 'വീണ്ടും ആരംഭിക്കുക',

  'footer.disclaimer': 'ഈ ഉപകരണം വൈദ്യ ഉപദേശം നൽകുന്നില്ല.',
  'footer.copyright': 'എമർജൻസി ട്രയേജ് അസിസ്റ്റന്റ് • MVP',

  'a11y.urgencyAnnouncement': 'വിലയിരുത്തൽ പൂർത്തിയായി. അത്യാഹിത നില:',
  'a11y.skipToMain': 'പ്രധാന ഉള്ളടക്കത്തിലേക്ക് പോകുക',
  'a11y.progressAnnouncement': '{total} ൽ {current} ചോദ്യം',

  'form.chooseAnyOne':
  'എന്ത് സംഭവിച്ചതാണെന്ന് അറിയിക്കാൻ താഴെയുള്ള ഏതെങ്കിലും ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കാം.',
'form.voiceOptional':
  'അല്ലെങ്കിൽ ചെറിയ വോയ്‌സ് വിവരണം റെക്കോർഡ് ചെയ്യാം (ഐച്ഛികം).',
'form.startRecording': 'റെക്കോർഡിംഗ് ആരംഭിക്കുക',
'form.stopRecording': 'റെക്കോർഡിംഗ് നിർത്തുക',
'form.photoOptional':
  'അല്ലെങ്കിൽ ഫോട്ടോ അപ്‌ലോഡ് / ക്യാപ്ചർ ചെയ്യാം (ഐച്ഛികം).',
'form.uploadOrCapture': 'ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക അല്ലെങ്കിൽ ക്യാപ്ചർ ചെയ്യുക',
'form.photoPreviewAlt': 'തിരഞ്ഞെടുത്ത ഫോട്ടോയുടെ പ്രിവ്യൂ',
'form.describeWhatHappened': 'എന്ത് സംഭവിച്ചുവെന്ന് എഴുതുക',
'form.describePlaceholder':
  'അപത്കാലാവസ്ഥയെക്കുറിച്ച് കൂടുതൽ വിശദാംശങ്ങൾ നൽകുക...',
'form.optional': 'ഐച്ഛികം',
'form.atLeastOneRequired':
  'കുറഞ്ഞത് ഒന്ന് എങ്കിലും തിരഞ്ഞെടുക്കുക: ക്വിക്ക് ഓപ്ഷൻ, വോയ്‌സ് നോട്ട, ഫോട്ടോ അല്ലെങ്കിൽ സന്ദേശം.',
'conscious.yesDesc': 'രോഗി ജാഗരൂകനാണ്, പ്രതികരിക്കുന്നു',
'conscious.noDesc': 'രോഗിക്ക് ബോധമില്ല, പ്രതികരണം ഇല്ല',
'conscious.unsureDesc': 'രോഗിക്ക് ബോധമുണ്ടോ എന്ന് വ്യക്തമല്ല',

},
odia: {
  'hero.badge': 'ଜରୁରୀ ସହାୟତା',
  'hero.title': 'ଚିକିତ୍ସା ଜରୁରୀ ସ୍ଥିତିରେ ତୁରନ୍ତ ସହାୟତା ପାଆନ୍ତୁ',
  'hero.subtitle': 'ଜରୁରୀ ସେବାଗୁଡ଼ିକୁ ଶୀଘ୍ର କାର୍ଯ୍ୟ କରିବାକୁ କିଛି ପ୍ରଶ୍ନର ଉତ୍ତର ଦିଅନ୍ତୁ।',
  'hero.startAssessment': 'ଜରୁରୀ ମୂଲ୍ୟାୟନ ଆରମ୍ଭ କରନ୍ତୁ',
  'hero.callEmergency': 'ଜରୁରୀ ସେବାକୁ କଲ୍ କରନ୍ତୁ',
  'hero.step1': 'କିଛି ଦ୍ରୁତ ପ୍ରଶ୍ନର ଉତ୍ତର ଦିଅନ୍ତୁ',
  'hero.step2': 'ତୀବ୍ରତା ମୂଲ୍ୟାୟନ',
  'hero.step3': 'ଠିକ୍ ସହାୟତା ପାଆନ୍ତୁ',

  'form.question': 'ପ୍ରଶ୍ନ',
  'form.whatHappened': 'କଣ ଘଟିଲା?',
  'form.isConscious': 'ରୋଗୀ ସଚେତନ କି?',
  'form.ageGroup': 'ରୋଗୀର ବୟସ ଶ୍ରେଣୀ?',
  'form.location': 'ରୋଗୀ କେଉଁଠାରେ ଅଛନ୍ତି?',
  'form.locationPlaceholder': 'ଠିକଣା ଦିଅନ୍ତୁ କିମ୍ବା ସ୍ଥାନ ବର୍ଣ୍ଣନା କରନ୍ତୁ',
  'form.back': 'ପଛକୁ',
  'form.continue': 'ଚାଲୁ ରଖନ୍ତୁ',
  'form.getAssessment': 'ମୂଲ୍ୟାୟନ ପାଆନ୍ତୁ',

  'incident.accident': 'ଦୁର୍ଘଟଣା',
  'incident.collapse': 'ହଠାତ୍ ପଡ଼ିଯିବା',
  'incident.breathing': 'ଶ୍ୱାସ ସମସ୍ୟା',
  'incident.bleeding': 'ଭାରୀ ରକ୍ତସ୍ରାବ',
  'incident.other': 'ଅନ୍ୟ',

  'conscious.yes': 'ହଁ',
  'conscious.no': 'ନା',
  'conscious.unsure': 'ନିଶ୍ଚିତ ନୁହେଁ',

  'age.child': 'ଶିଶୁ',
  'age.adult': 'ବୟସ୍କ',
  'age.elderly': 'ବୃଦ୍ଧ',

  'result.emergency': 'ଜରୁରୀ',
  'result.urgent': 'ତୁରନ୍ତ',
  'result.nonEmergency': 'ଜରୁରୀ ନୁହେଁ',

  'result.emergencyExplanation': 'ଆପଣଙ୍କ ଉତ୍ତର ଆଧାରରେ ତୁରନ୍ତ ଚିକିତ୍ସା ସହାୟତା ଆବଶ୍ୟକ।',
  'result.urgentExplanation': 'ଏହି ସ୍ଥିତିରେ ଶୀଘ୍ର ଚିକିତ୍ସା ଧ୍ୟାନ ଆବଶ୍ୟକ।',
  'result.nonEmergencyExplanation': 'ସ୍ଥିତି ସ୍ଥିର, କିନ୍ତୁ ନିରୀକ୍ଷଣ ଆବଶ୍ୟକ।',

  'result.emergencyRecommendation': 'ତୁରନ୍ତ ଜରୁରୀ ସେବାକୁ କଲ୍ କରନ୍ତୁ',
  'result.urgentRecommendation': 'ଶୀଘ୍ର ଚିକିତ୍ସା ସହାୟତା ନିଅନ୍ତୁ',
  'result.nonEmergencyRecommendation': 'ସ୍ୱାସ୍ଥ୍ୟ ସେବାଦାତାଙ୍କୁ ସମ୍ପର୍କ କରନ୍ତୁ',

  'result.recommendedAction': 'ସୁପାରିଶିତ କାର୍ଯ୍ୟ',
  'result.ambulanceType': 'ସୁପାରିଶିତ ଆମ୍ବୁଲାନ୍ସ ପ୍ରକାର',
  'result.viewSummary': 'ଡିସ୍ପାଚ୍ ସାରାଂଶ ଦେଖନ୍ତୁ',

  'ambulance.basic': 'ମୂଳ ଜୀବନ ସହାୟତା',
  'ambulance.cardiac': 'ହୃଦୟ ଜୀବନ ସହାୟତା',
  'ambulance.trauma': 'ଟ୍ରମା ଆମ୍ବୁଲାନ୍ସ',

  'summary.title': 'ଡିସ୍ପାଚ୍ ସାରାଂଶ',
  'summary.subtitle': 'ଏହି ସୂଚନା ଜରୁରୀ ସେବା ସହ ସେୟାର କରନ୍ତୁ',
  'summary.incidentType': 'ଘଟଣା ପ୍ରକାର',
  'summary.ageGroup': 'ବୟସ ଶ୍ରେଣୀ',
  'summary.conscious': 'ସଚେତନତା',
  'summary.location': 'ସ୍ଥାନ',
  'summary.ambulanceType': 'ଆମ୍ବୁଲାନ୍ସ ପ୍ରକାର',
  'summary.preArrivalNote': 'ଆସିବା ପୂର୍ବ ଟିପ୍ପଣୀ',
  'summary.call': 'କଲ୍ କରନ୍ତୁ',
  'summary.copy': 'କପି କରନ୍ତୁ',
  'summary.share': 'ସେୟାର କରନ୍ତୁ',
  'summary.copied': 'କପି ହେଲା',
  'summary.viewTips': 'ଅପେକ୍ଷା ସମୟରେ ସୁରକ୍ଷା ସୁପାରିଶ',
  'summary.disclaimer': 'ଏହି ଉପକରଣ ଚିକିତ୍ସା ନିର୍ଣ୍ଣୟ ଦେଉନାହିଁ।',
  'summary.patientLocation': 'ରୋଗୀର ସ୍ଥାନ',

  'waiting.title': 'ସହାୟତା ଆସୁଛି',
  'waiting.subtitle': 'ଅପେକ୍ଷା କରୁଥିବାବେଳେ ଆପଣ କରିପାରିବେ',
  'waiting.stayCalmTitle': 'ଶାନ୍ତ ରୁହନ୍ତୁ',
  'waiting.stayCalmDesc': 'ଧୀରେ ଏବଂ ଗଭୀର ଶ୍ୱାସ ନିଅନ୍ତୁ।',
  'waiting.keepStillTitle': 'ରୋଗୀକୁ ସ୍ଥିର ରଖନ୍ତୁ',
  'waiting.keepStillDesc': 'ତୁରନ୍ତ ବିପଦ ନଥିଲେ ହଲାନ୍ତୁ ନାହିଁ।',
  'waiting.followTitle': 'ନିର୍ଦ୍ଦେଶ ଅନୁସରଣ କରନ୍ତୁ',
  'waiting.followDesc': 'ଜରୁରୀ ସେବାର ନିର୍ଦ୍ଦେଶ ମାନନ୍ତୁ।',
  'waiting.notice': 'ଏଗୁଡ଼ିକ ସାଧାରଣ ନିର୍ଦ୍ଦେଶ।',
  'waiting.startOver': 'ପୁନଃ ଆରମ୍ଭ କରନ୍ତୁ',

  'footer.disclaimer': 'ଏହି ଉପକରଣ ଚିକିତ୍ସା ପରାମର୍ଶ ଦେଉନାହିଁ।',
  'footer.copyright': 'ଏମରଜେନ୍ସି ଟ୍ରାୟେଜ୍ ଆସିଷ୍ଟାଣ୍ଟ • MVP',

  'a11y.urgencyAnnouncement': 'ମୂଲ୍ୟାୟନ ସମ୍ପୂର୍ଣ୍ଣ। ଜରୁରୀ ସ୍ତର:',
  'a11y.skipToMain': 'ମୁଖ୍ୟ ବିଷୟବସ୍ତୁକୁ ଯାଆନ୍ତୁ',
  'a11y.progressAnnouncement': '{total} ମଧ୍ୟରୁ {current} ପ୍ରଶ୍ନ',

  'form.chooseAnyOne':
  'କଣ ଘଟିଛି ବଲି କହିବା ପାଇଁ ନିମ୍ନୋକ୍ତ ଯେକୌଣସି ଗୋଟିଏ ବିକଳ୍ପ ଚୟନ କରନ୍ତୁ।',
'form.voiceOptional':
  'କିମ୍ବା ଛୋଟ ଭୟସ୍ ବିବରଣୀ ରେକର୍ଡ କରନ୍ତୁ (ଐଚ୍ଛିକ)।',
'form.startRecording': 'ରେକର୍ଡିଂ ଆରମ୍ଭ କରନ୍ତୁ',
'form.stopRecording': 'ରେକର୍ଡିଂ ବନ୍ଦ କରନ୍ତୁ',
'form.photoOptional':
  'କିମ୍ବା ଫୋଟୋ ଅପଲୋଡ୍ / କ୍ୟାପଚର୍ କରନ୍ତୁ (ଐଚ୍ଛିକ)।',
'form.uploadOrCapture': 'ଫୋଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ କିମ୍ବା କ୍ୟାପଚର୍ କରନ୍ତୁ',
'form.photoPreviewAlt': 'ଚୟନିତ ଫୋଟୋର ପ୍ରିଭ୍ୟୁ',
'form.describeWhatHappened': 'କଣ ଘଟିଲା ଲେଖନ୍ତୁ',
'form.describePlaceholder':
  'ଆପତ୍କାଳୀନ ପରିସ୍ଥିତି ସମ୍ବନ୍ଧୀୟ ଅଧିକ ବିବରଣୀ ଦିଅନ୍ତୁ...',
'form.optional': 'ଐଚ୍ଛିକ',
'form.atLeastOneRequired':
  'କମ୍ ରେ କମ୍ ଗୋଟିଏ ଚୟନ କରନ୍ତୁ: ତୁରନ୍ତ ବିକଳ୍ପ, ଭୟସ୍ ନୋଟ୍, ଫୋଟୋ କିମ୍ବା ସନ୍ଦେଶ।',
'conscious.yesDesc': 'ରୋଗୀ ସଚେତନ ଅଛନ୍ତି ଏବଂ ପ୍ରତିକ୍ରିଆ ଦେଉଛନ୍ତି',
'conscious.noDesc': 'ରୋଗୀ ଅଚେତନ, କୌଣସି ପ୍ରତିକ୍ରିଆ ନାହିଁ',
'conscious.unsureDesc': 'ରୋଗୀ ସଚେତନ କି ନୁହେଁ, ସ୍ପଷ୍ଟ ନୁହେଁ',

},
punjabi: {
  'hero.badge': 'ਐਮਰਜੈਂਸੀ ਸਹਾਇਤਾ',
  'hero.title': 'ਚਿਕਿਤਸਕ ਐਮਰਜੈਂਸੀ ਦੌਰਾਨ ਤੁਰੰਤ ਮਦਦ ਪ੍ਰਾਪਤ ਕਰੋ',
  'hero.subtitle': 'ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਨੂੰ ਤੇਜ਼ੀ ਨਾਲ ਕਾਰਵਾਈ ਕਰਨ ਲਈ ਕੁਝ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਦਿਓ।',
  'hero.startAssessment': 'ਐਮਰਜੈਂਸੀ ਮੁਲਾਂਕਣ ਸ਼ੁਰੂ ਕਰੋ',
  'hero.callEmergency': 'ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਨੂੰ ਕਾਲ ਕਰੋ',
  'hero.step1': 'ਕੁਝ ਤੇਜ਼ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਦਿਓ',
  'hero.step2': 'ਤੁਰੰਤਤਾ ਦਾ ਮੁਲਾਂਕਣ',
  'hero.step3': 'ਸਹੀ ਮਦਦ ਪ੍ਰਾਪਤ ਕਰੋ',

  'form.question': 'ਸਵਾਲ',
  'form.whatHappened': 'ਕੀ ਹੋਇਆ?',
  'form.isConscious': 'ਕੀ ਮਰੀਜ਼ ਸਚੇਤ ਹੈ?',
  'form.ageGroup': 'ਮਰੀਜ਼ ਦੀ ਉਮਰ ਸਮੂਹ?',
  'form.location': 'ਮਰੀਜ਼ ਕਿੱਥੇ ਹੈ?',
  'form.locationPlaceholder': 'ਪਤਾ ਦਰਜ ਕਰੋ ਜਾਂ ਸਥਾਨ ਵਰਣਨ ਕਰੋ',
  'form.back': 'ਵਾਪਸ',
  'form.continue': 'ਜਾਰੀ ਰੱਖੋ',
  'form.getAssessment': 'ਮੁਲਾਂਕਣ ਪ੍ਰਾਪਤ ਕਰੋ',

  'incident.accident': 'ਹਾਦਸਾ',
  'incident.collapse': 'ਅਚਾਨਕ ਡਿੱਗਣਾ',
  'incident.breathing': 'ਸਾਹ ਲੈਣ ਦੀ ਸਮੱਸਿਆ',
  'incident.bleeding': 'ਭਾਰੀ ਖੂਨ ਵਗਣਾ',
  'incident.other': 'ਹੋਰ',

  'conscious.yes': 'ਹਾਂ',
  'conscious.no': 'ਨਹੀਂ',
  'conscious.unsure': 'ਪੱਕਾ ਨਹੀਂ',

  'age.child': 'ਬੱਚਾ',
  'age.adult': 'ਵਯਸਕ',
  'age.elderly': 'ਬੁਜ਼ੁਰਗ',

  'result.emergency': 'ਐਮਰਜੈਂਸੀ',
  'result.urgent': 'ਤੁਰੰਤ',
  'result.nonEmergency': 'ਐਮਰਜੈਂਸੀ ਨਹੀਂ',

  'result.emergencyExplanation': 'ਤੁਹਾਡੇ ਜਵਾਬਾਂ ਦੇ ਆਧਾਰ ਤੇ ਤੁਰੰਤ ਚਿਕਿਤਸਕ ਮਦਦ ਦੀ ਲੋੜ ਹੈ।',
  'result.urgentExplanation': 'ਇਸ ਹਾਲਤ ਵਿੱਚ ਤੇਜ਼ ਚਿਕਿਤਸਕ ਧਿਆਨ ਦੀ ਲੋੜ ਹੈ।',
  'result.nonEmergencyExplanation': 'ਹਾਲਤ ਸਥਿਰ ਹੈ, ਪਰ ਨਿਗਰਾਨੀ ਲੋੜੀਂਦੀ ਹੈ।',

  'result.emergencyRecommendation': 'ਤੁਰੰਤ ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਨੂੰ ਕਾਲ ਕਰੋ',
  'result.urgentRecommendation': 'ਜਲਦੀ ਤੋਂ ਜਲਦੀ ਚਿਕਿਤਸਕ ਮਦਦ ਲਓ',
  'result.nonEmergencyRecommendation': 'ਸਿਹਤ ਸੇਵਾ ਪ੍ਰਦਾਤਾ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',

  'result.recommendedAction': 'ਸਿਫ਼ਾਰਸ਼ੀ ਕਾਰਵਾਈ',
  'result.ambulanceType': 'ਸਿਫ਼ਾਰਸ਼ੀ ਐਂਬੂਲੈਂਸ ਕਿਸਮ',
  'result.viewSummary': 'ਡਿਸਪੈਚ ਸਾਰ ਵੇਖੋ',

  'ambulance.basic': 'ਬੁਨਿਆਦੀ ਜੀਵਨ ਸਹਾਇਤਾ',
  'ambulance.cardiac': 'ਦਿਲ ਜੀਵਨ ਸਹਾਇਤਾ',
  'ambulance.trauma': 'ਟ੍ਰੌਮਾ ਐਂਬੂਲੈਂਸ',

  'summary.title': 'ਡਿਸਪੈਚ ਸਾਰ',
  'summary.subtitle': 'ਇਹ ਜਾਣਕਾਰੀ ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਨਾਲ ਸਾਂਝੀ ਕਰੋ',
  'summary.incidentType': 'ਘਟਨਾ ਦੀ ਕਿਸਮ',
  'summary.ageGroup': 'ਉਮਰ ਸਮੂਹ',
  'summary.conscious': 'ਸਚੇਤਤਾ',
  'summary.location': 'ਸਥਾਨ',
  'summary.ambulanceType': 'ਐਂਬੂਲੈਂਸ ਕਿਸਮ',
  'summary.preArrivalNote': 'ਪਹੁੰਚ ਤੋਂ ਪਹਿਲਾਂ ਨੋਟ',
  'summary.call': 'ਕਾਲ ਕਰੋ',
  'summary.copy': 'ਕਾਪੀ ਕਰੋ',
  'summary.share': 'ਸਾਂਝਾ ਕਰੋ',
  'summary.copied': 'ਕਾਪੀ ਹੋਇਆ',
  'summary.viewTips': 'ਉਡੀਕ ਦੌਰਾਨ ਸੁਰੱਖਿਆ ਸੁਝਾਅ',
  'summary.disclaimer': 'ਇਹ ਸੰਦ ਚਿਕਿਤਸਕ ਨਿਦਾਨ ਨਹੀਂ ਦਿੰਦਾ।',
  'summary.patientLocation': 'ਮਰੀਜ਼ ਦਾ ਸਥਾਨ',

  'waiting.title': 'ਮਦਦ ਆ ਰਹੀ ਹੈ',
  'waiting.subtitle': 'ਉਡੀਕ ਦੌਰਾਨ ਤੁਸੀਂ ਇਹ ਕਰ ਸਕਦੇ ਹੋ',
  'waiting.stayCalmTitle': 'ਸ਼ਾਂਤ ਰਹੋ',
  'waiting.stayCalmDesc': 'ਹੌਲੀ ਅਤੇ ਗਹਿਰੇ ਸਾਹ ਲਵੋ।',
  'waiting.keepStillTitle': 'ਮਰੀਜ਼ ਨੂੰ ਅਡਿੱਗ ਰੱਖੋ',
  'waiting.keepStillDesc': 'ਤੁਰੰਤ ਖਤਰਾ ਨਾ ਹੋਵੇ ਤਾਂ ਹਿਲਾਓ ਨਾ।',
  'waiting.followTitle': 'ਹਦਾਇਤਾਂ ਮੰਨੋ',
  'waiting.followDesc': 'ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਦੀਆਂ ਹਦਾਇਤਾਂ ਮੰਨੋ।',
  'waiting.notice': 'ਇਹ ਆਮ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ ਹਨ।',
  'waiting.startOver': 'ਮੁੜ ਸ਼ੁਰੂ ਕਰੋ',

  'footer.disclaimer': 'ਇਹ ਸੰਦ ਚਿਕਿਤਸਕ ਸਲਾਹ ਨਹੀਂ ਦਿੰਦਾ।',
  'footer.copyright': 'ਐਮਰਜੈਂਸੀ ਟ੍ਰਾਇਏਜ ਸਹਾਇਕ • MVP',

  'a11y.urgencyAnnouncement': 'ਮੁਲਾਂਕਣ ਪੂਰਾ। ਐਮਰਜੈਂਸੀ ਪੱਧਰ:',
  'a11y.skipToMain': 'ਮੁੱਖ ਸਮੱਗਰੀ ਉੱਤੇ ਜਾਓ',
  'a11y.progressAnnouncement': '{total} ਵਿੱਚੋਂ {current} ਸਵਾਲ',

  'form.chooseAnyOne':
  'ਕੀ ਹੋਇਆ ਹੈ ਇਹ ਦੱਸਣ ਲਈ ਹੇਠਾਂ ਦਿੱਤੇ ਵਿਚੋਂ ਕੋਈ ਵੀ ਇੱਕ ਵਿਕਲਪ ਚੁਣ ਸਕਦੇ ਹੋ।',
'form.voiceOptional':
  'ਜਾਂ ਇੱਕ ਛੋਟਾ ਵੌਇਸ ਵੇਰਵਾ ਰਿਕਾਰਡ ਕਰੋ (ਵਿਕਲਪਿਕ)।',
'form.startRecording': 'ਰਿਕਾਰਡਿੰਗ ਸ਼ੁਰੂ ਕਰੋ',
'form.stopRecording': 'ਰਿਕਾਰਡਿੰਗ ਰੋਕੋ',
'form.photoOptional':
  'ਜਾਂ ਫੋਟੋ ਅੱਪਲੋਡ / ਕੈਪਚਰ ਕਰੋ (ਵਿਕਲਪਿਕ)।',
'form.uploadOrCapture': 'ਫੋਟੋ ਅੱਪਲੋਡ ਜਾਂ ਕੈਪਚਰ ਕਰੋ',
'form.photoPreviewAlt': 'ਚੁਣੀ ਹੋਈ ਫੋਟੋ ਦਾ ਪ੍ਰਿਵਿਊ',
'form.describeWhatHappened': 'ਕੀ ਹੋਇਆ ਹੈ, ਲਿਖੋ',
'form.describePlaceholder':
  'ਐਮਰਜੈਂਸੀ ਬਾਰੇ ਹੋਰ ਵੇਰਵੇ ਲਿਖੋ...',
'form.optional': 'ਵਿਕਲਪਿਕ',
'form.atLeastOneRequired':
  'ਘੱਟੋ-ਘੱਟ ਇੱਕ ਚੁਣੋ: ਕਵਿਕ ਵਿਕਲਪ, ਵੌਇਸ ਨੋਟ, ਫੋਟੋ ਜਾਂ ਸਨੇਹਾ।',
  'conscious.yesDesc': 'ਮਰੀਜ਼ ਜਾਗ ਰਿਹਾ ਹੈ ਅਤੇ ਪ੍ਰਤੀਕ੍ਰਿਆ ਕਰ ਰਿਹਾ ਹੈ',
'conscious.noDesc': 'ਮਰੀਜ਼ ਬੇਹੋਸ਼ ਹੈ, ਕੋਈ ਪ੍ਰਤੀਕ੍ਰਿਆ ਨਹੀਂ',
'conscious.unsureDesc': 'ਮਰੀਜ਼ ਦੀ ਹੋਸ਼ ਦੀ ਹਾਲਤ ਬਾਰੇ ਪੱਕਾ ਨਹੀਂ',

}
};


interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  emergencyNumber: string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('english');

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || translations['english'][key] || key;
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, String(value));
      });
    }
    return text;
  };

  const currentLang = languages.find(l => l.code === language);
  const emergencyNumber = currentLang?.emergencyNumber || '911';
  const isRTL = false;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, emergencyNumber, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
