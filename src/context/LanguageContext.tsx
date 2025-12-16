import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'zh' | 'ar';

interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  emergencyNumber: string;
}

export const languages: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', emergencyNumber: '911' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', emergencyNumber: '911' },
  { code: 'fr', name: 'French', nativeName: 'Français', emergencyNumber: '15' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', emergencyNumber: '120' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', emergencyNumber: '911' },
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
  | 'a11y.progressAnnouncement';

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    'hero.badge': 'Emergency Assistance',
    'hero.title': 'Get help fast during a medical emergency',
    'hero.subtitle': 'Answer a few quick questions to help emergency responders act faster.',
    'hero.startAssessment': 'Start Emergency Assessment',
    'hero.callEmergency': 'Call Emergency Services',
    'hero.step1': 'Quick Questions',
    'hero.step2': 'Urgency Assessment',
    'hero.step3': 'Get Help',
    'form.question': 'Question',
    'form.whatHappened': 'What happened?',
    'form.isConscious': 'Is the patient conscious?',
    'form.ageGroup': 'Age group of the patient?',
    'form.location': 'Where is the patient?',
    'form.locationPlaceholder': 'Enter address or describe location',
    'form.back': 'Back',
    'form.continue': 'Continue',
    'form.getAssessment': 'Get Assessment',
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
  },
  es: {
    'hero.badge': 'Asistencia de Emergencia',
    'hero.title': 'Obtén ayuda rápida durante una emergencia médica',
    'hero.subtitle': 'Responde algunas preguntas rápidas para ayudar a los servicios de emergencia a actuar más rápido.',
    'hero.startAssessment': 'Iniciar Evaluación',
    'hero.callEmergency': 'Llamar Emergencias',
    'hero.step1': 'Preguntas Rápidas',
    'hero.step2': 'Evaluación de Urgencia',
    'hero.step3': 'Obtener Ayuda',
    'form.question': 'Pregunta',
    'form.whatHappened': '¿Qué pasó?',
    'form.isConscious': '¿El paciente está consciente?',
    'form.ageGroup': '¿Grupo de edad del paciente?',
    'form.location': '¿Dónde está el paciente?',
    'form.locationPlaceholder': 'Ingresa dirección o describe ubicación',
    'form.back': 'Atrás',
    'form.continue': 'Continuar',
    'form.getAssessment': 'Obtener Evaluación',
    'incident.accident': 'Accidente',
    'incident.collapse': 'Colapso Repentino',
    'incident.breathing': 'Problema Respiratorio',
    'incident.bleeding': 'Sangrado Severo',
    'incident.other': 'Otro',
    'conscious.yes': 'Sí',
    'conscious.no': 'No',
    'conscious.unsure': 'No Seguro',
    'age.child': 'Niño',
    'age.adult': 'Adulto',
    'age.elderly': 'Anciano',
    'result.emergency': 'Emergencia',
    'result.urgent': 'Urgente',
    'result.nonEmergency': 'No Emergencia',
    'result.emergencyExplanation': 'Según sus respuestas, se recomienda ayuda profesional inmediata.',
    'result.urgentExplanation': 'Esta situación requiere atención médica pronta.',
    'result.nonEmergencyExplanation': 'La situación parece estable pero se recomienda monitoreo.',
    'result.emergencyRecommendation': 'Llame a servicios de emergencia inmediatamente',
    'result.urgentRecommendation': 'Busque atención médica lo antes posible',
    'result.nonEmergencyRecommendation': 'Considere visitar un proveedor de salud',
    'result.recommendedAction': 'Acción Recomendada',
    'result.ambulanceType': 'Tipo de Ambulancia Recomendado',
    'result.viewSummary': 'Ver Resumen de Despacho',
    'ambulance.basic': 'Soporte Vital Básico',
    'ambulance.cardiac': 'Soporte Vital Cardíaco',
    'ambulance.trauma': 'Ambulancia de Trauma',
    'summary.title': 'Resumen de Despacho',
    'summary.subtitle': 'Comparta esta información con servicios de emergencia',
    'summary.incidentType': 'Tipo de Incidente',
    'summary.ageGroup': 'Grupo de Edad',
    'summary.conscious': 'Consciente',
    'summary.location': 'Ubicación',
    'summary.ambulanceType': 'Tipo de Ambulancia',
    'summary.preArrivalNote': 'Nota Pre-Llegada',
    'summary.call': 'Llamar',
    'summary.copy': 'Copiar Resumen',
    'summary.share': 'Compartir',
    'summary.copied': 'Copiado',
    'summary.viewTips': 'Ver Consejos de Seguridad',
    'summary.disclaimer': 'Esta herramienta no proporciona diagnóstico médico. La evaluación se basa solo en información proporcionada por el usuario.',
    'summary.patientLocation': 'Ubicación del Paciente',
    'waiting.title': 'Mientras Llega la Ayuda',
    'waiting.subtitle': 'Aquí hay algunas cosas que puede hacer mientras espera',
    'waiting.stayCalmTitle': 'Mantenga la Calma',
    'waiting.stayCalmDesc': 'Respire lento y profundo. Su calma ayuda al paciente.',
    'waiting.keepStillTitle': 'Mantenga al Paciente Quieto',
    'waiting.keepStillDesc': 'A menos que haya peligro inmediato, evite mover al paciente.',
    'waiting.followTitle': 'Siga Instrucciones',
    'waiting.followDesc': 'Si llamó a emergencias, siga su guía.',
    'waiting.notice': 'Esta guía es de naturaleza general. Siempre siga las instrucciones específicas de los operadores de emergencia cuando estén disponibles.',
    'waiting.startOver': 'Comenzar de Nuevo',
    'footer.disclaimer': 'Importante: Esta herramienta no proporciona diagnóstico o consejo médico. Está diseñada para ayudar a organizar información para los servicios de emergencia. Siempre llame directamente a emergencias en situaciones de vida o muerte.',
    'footer.copyright': 'Asistente de Triaje de Emergencia • Prototipo MVP',
    'a11y.urgencyAnnouncement': 'Evaluación completa. Nivel de urgencia:',
    'a11y.skipToMain': 'Saltar al contenido principal',
    'a11y.progressAnnouncement': 'Pregunta {current} de {total}',
  },
  fr: {
    'hero.badge': 'Assistance d\'Urgence',
    'hero.title': 'Obtenez de l\'aide rapidement en cas d\'urgence médicale',
    'hero.subtitle': 'Répondez à quelques questions rapides pour aider les secours à agir plus vite.',
    'hero.startAssessment': 'Commencer l\'Évaluation',
    'hero.callEmergency': 'Appeler les Urgences',
    'hero.step1': 'Questions Rapides',
    'hero.step2': 'Évaluation d\'Urgence',
    'hero.step3': 'Obtenir de l\'Aide',
    'form.question': 'Question',
    'form.whatHappened': 'Que s\'est-il passé?',
    'form.isConscious': 'Le patient est-il conscient?',
    'form.ageGroup': 'Groupe d\'âge du patient?',
    'form.location': 'Où est le patient?',
    'form.locationPlaceholder': 'Entrez l\'adresse ou décrivez l\'emplacement',
    'form.back': 'Retour',
    'form.continue': 'Continuer',
    'form.getAssessment': 'Obtenir l\'Évaluation',
    'incident.accident': 'Accident',
    'incident.collapse': 'Malaise Soudain',
    'incident.breathing': 'Problème Respiratoire',
    'incident.bleeding': 'Saignement Sévère',
    'incident.other': 'Autre',
    'conscious.yes': 'Oui',
    'conscious.no': 'Non',
    'conscious.unsure': 'Pas Sûr',
    'age.child': 'Enfant',
    'age.adult': 'Adulte',
    'age.elderly': 'Personne Âgée',
    'result.emergency': 'Urgence',
    'result.urgent': 'Urgent',
    'result.nonEmergency': 'Non-Urgent',
    'result.emergencyExplanation': 'Selon vos réponses, une aide professionnelle immédiate est recommandée.',
    'result.urgentExplanation': 'Cette situation nécessite une attention médicale rapide.',
    'result.nonEmergencyExplanation': 'La situation semble stable mais une surveillance est conseillée.',
    'result.emergencyRecommendation': 'Appelez les urgences immédiatement',
    'result.urgentRecommendation': 'Consultez un médecin dès que possible',
    'result.nonEmergencyRecommendation': 'Envisagez de consulter un professionnel de santé',
    'result.recommendedAction': 'Action Recommandée',
    'result.ambulanceType': 'Type d\'Ambulance Recommandé',
    'result.viewSummary': 'Voir le Résumé',
    'ambulance.basic': 'Secours de Base',
    'ambulance.cardiac': 'Secours Cardiaque',
    'ambulance.trauma': 'Ambulance Trauma',
    'summary.title': 'Résumé d\'Intervention',
    'summary.subtitle': 'Partagez ces informations avec les services d\'urgence',
    'summary.incidentType': 'Type d\'Incident',
    'summary.ageGroup': 'Groupe d\'Âge',
    'summary.conscious': 'Conscient',
    'summary.location': 'Emplacement',
    'summary.ambulanceType': 'Type d\'Ambulance',
    'summary.preArrivalNote': 'Note Pré-Arrivée',
    'summary.call': 'Appeler',
    'summary.copy': 'Copier le Résumé',
    'summary.share': 'Partager',
    'summary.copied': 'Copié',
    'summary.viewTips': 'Voir les Conseils de Sécurité',
    'summary.disclaimer': 'Cet outil ne fournit pas de diagnostic médical. L\'évaluation est basée uniquement sur les informations fournies par l\'utilisateur.',
    'summary.patientLocation': 'Emplacement du Patient',
    'waiting.title': 'En Attendant les Secours',
    'waiting.subtitle': 'Voici quelques choses que vous pouvez faire en attendant',
    'waiting.stayCalmTitle': 'Restez Calme',
    'waiting.stayCalmDesc': 'Respirez lentement et profondément. Votre calme aide le patient.',
    'waiting.keepStillTitle': 'Gardez le Patient Immobile',
    'waiting.keepStillDesc': 'Sauf danger immédiat, évitez de déplacer le patient.',
    'waiting.followTitle': 'Suivez les Instructions',
    'waiting.followDesc': 'Si vous avez appelé les urgences, suivez leurs conseils.',
    'waiting.notice': 'Ces conseils sont généraux. Suivez toujours les instructions spécifiques des opérateurs d\'urgence lorsqu\'elles sont disponibles.',
    'waiting.startOver': 'Recommencer',
    'footer.disclaimer': 'Important: Cet outil ne fournit pas de diagnostic ou conseil médical. Il est conçu pour aider à organiser les informations pour les secours. Appelez toujours directement les urgences dans les situations mettant la vie en danger.',
    'footer.copyright': 'Assistant de Triage d\'Urgence • Prototype MVP',
    'a11y.urgencyAnnouncement': 'Évaluation terminée. Niveau d\'urgence:',
    'a11y.skipToMain': 'Aller au contenu principal',
    'a11y.progressAnnouncement': 'Question {current} sur {total}',
  },
  zh: {
    'hero.badge': '紧急援助',
    'hero.title': '在医疗紧急情况下快速获得帮助',
    'hero.subtitle': '回答几个简单问题，帮助急救人员更快行动。',
    'hero.startAssessment': '开始紧急评估',
    'hero.callEmergency': '拨打急救电话',
    'hero.step1': '快速问题',
    'hero.step2': '紧急评估',
    'hero.step3': '获得帮助',
    'form.question': '问题',
    'form.whatHappened': '发生了什么？',
    'form.isConscious': '患者有意识吗？',
    'form.ageGroup': '患者年龄组？',
    'form.location': '患者在哪里？',
    'form.locationPlaceholder': '输入地址或描述位置',
    'form.back': '返回',
    'form.continue': '继续',
    'form.getAssessment': '获取评估',
    'incident.accident': '事故',
    'incident.collapse': '突然晕倒',
    'incident.breathing': '呼吸问题',
    'incident.bleeding': '严重出血',
    'incident.other': '其他',
    'conscious.yes': '是',
    'conscious.no': '否',
    'conscious.unsure': '不确定',
    'age.child': '儿童',
    'age.adult': '成人',
    'age.elderly': '老人',
    'result.emergency': '紧急',
    'result.urgent': '急需',
    'result.nonEmergency': '非紧急',
    'result.emergencyExplanation': '根据您的回答，建议立即寻求专业帮助。',
    'result.urgentExplanation': '这种情况需要及时的医疗关注。',
    'result.nonEmergencyExplanation': '情况看起来稳定，但建议继续观察。',
    'result.emergencyRecommendation': '立即拨打急救电话',
    'result.urgentRecommendation': '尽快寻求医疗帮助',
    'result.nonEmergencyRecommendation': '考虑就医',
    'result.recommendedAction': '建议行动',
    'result.ambulanceType': '建议急救车类型',
    'result.viewSummary': '查看调度摘要',
    'ambulance.basic': '基础生命支持',
    'ambulance.cardiac': '心脏生命支持',
    'ambulance.trauma': '创伤急救车',
    'summary.title': '调度摘要',
    'summary.subtitle': '与急救服务分享此信息',
    'summary.incidentType': '事件类型',
    'summary.ageGroup': '年龄组',
    'summary.conscious': '意识状态',
    'summary.location': '位置',
    'summary.ambulanceType': '急救车类型',
    'summary.preArrivalNote': '到达前说明',
    'summary.call': '拨打',
    'summary.copy': '复制摘要',
    'summary.share': '分享',
    'summary.copied': '已复制',
    'summary.viewTips': '查看等待期间的安全提示',
    'summary.disclaimer': '此工具不提供医学诊断。评估仅基于用户提供的信息。',
    'summary.patientLocation': '患者位置',
    'waiting.title': '等待救援时',
    'waiting.subtitle': '以下是您在等待时可以做的事情',
    'waiting.stayCalmTitle': '保持冷静',
    'waiting.stayCalmDesc': '慢慢深呼吸。您的冷静有助于患者。',
    'waiting.keepStillTitle': '保持患者不动',
    'waiting.keepStillDesc': '除非有直接危险，避免移动患者。',
    'waiting.followTitle': '遵循指示',
    'waiting.followDesc': '如果您已拨打急救电话，请按照他们的指导操作。',
    'waiting.notice': '此指导具有一般性质。请始终在可用时遵循急救人员的具体指示。',
    'waiting.startOver': '重新开始',
    'footer.disclaimer': '重要提示：此工具不提供医学诊断或建议。它旨在帮助为急救人员整理信息。在危及生命的情况下，请始终直接拨打急救电话。',
    'footer.copyright': '紧急分诊助手 • MVP原型',
    'a11y.urgencyAnnouncement': '评估完成。紧急程度：',
    'a11y.skipToMain': '跳至主要内容',
    'a11y.progressAnnouncement': '问题 {current} / {total}',
  },
  ar: {
    'hero.badge': 'مساعدة الطوارئ',
    'hero.title': 'احصل على المساعدة بسرعة أثناء حالة طوارئ طبية',
    'hero.subtitle': 'أجب على بعض الأسئلة السريعة لمساعدة المستجيبين للطوارئ على التصرف بشكل أسرع.',
    'hero.startAssessment': 'بدء تقييم الطوارئ',
    'hero.callEmergency': 'اتصل بخدمات الطوارئ',
    'hero.step1': 'أسئلة سريعة',
    'hero.step2': 'تقييم الإلحاح',
    'hero.step3': 'احصل على المساعدة',
    'form.question': 'سؤال',
    'form.whatHappened': 'ماذا حدث؟',
    'form.isConscious': 'هل المريض واعي؟',
    'form.ageGroup': 'الفئة العمرية للمريض؟',
    'form.location': 'أين المريض؟',
    'form.locationPlaceholder': 'أدخل العنوان أو صف الموقع',
    'form.back': 'رجوع',
    'form.continue': 'متابعة',
    'form.getAssessment': 'الحصول على التقييم',
    'incident.accident': 'حادث',
    'incident.collapse': 'انهيار مفاجئ',
    'incident.breathing': 'مشكلة في التنفس',
    'incident.bleeding': 'نزيف حاد',
    'incident.other': 'أخرى',
    'conscious.yes': 'نعم',
    'conscious.no': 'لا',
    'conscious.unsure': 'غير متأكد',
    'age.child': 'طفل',
    'age.adult': 'بالغ',
    'age.elderly': 'مسن',
    'result.emergency': 'طوارئ',
    'result.urgent': 'عاجل',
    'result.nonEmergency': 'غير طارئ',
    'result.emergencyExplanation': 'بناءً على إجاباتك، يُوصى بمساعدة مهنية فورية.',
    'result.urgentExplanation': 'هذه الحالة تتطلب اهتمامًا طبيًا سريعًا.',
    'result.nonEmergencyExplanation': 'يبدو أن الوضع مستقر ولكن يُنصح بالمراقبة.',
    'result.emergencyRecommendation': 'اتصل بخدمات الطوارئ فورًا',
    'result.urgentRecommendation': 'اطلب الرعاية الطبية في أقرب وقت ممكن',
    'result.nonEmergencyRecommendation': 'فكر في زيارة مقدم رعاية صحية',
    'result.recommendedAction': 'الإجراء الموصى به',
    'result.ambulanceType': 'نوع سيارة الإسعاف الموصى به',
    'result.viewSummary': 'عرض ملخص الإرسال',
    'ambulance.basic': 'دعم الحياة الأساسي',
    'ambulance.cardiac': 'دعم الحياة القلبية',
    'ambulance.trauma': 'سيارة إسعاف الصدمات',
    'summary.title': 'ملخص الإرسال',
    'summary.subtitle': 'شارك هذه المعلومات مع خدمات الطوارئ',
    'summary.incidentType': 'نوع الحادث',
    'summary.ageGroup': 'الفئة العمرية',
    'summary.conscious': 'واعي',
    'summary.location': 'الموقع',
    'summary.ambulanceType': 'نوع سيارة الإسعاف',
    'summary.preArrivalNote': 'ملاحظة قبل الوصول',
    'summary.call': 'اتصال',
    'summary.copy': 'نسخ الملخص',
    'summary.share': 'مشاركة',
    'summary.copied': 'تم النسخ',
    'summary.viewTips': 'عرض نصائح السلامة أثناء الانتظار',
    'summary.disclaimer': 'هذه الأداة لا تقدم تشخيصًا طبيًا. يعتمد التقييم على المعلومات المقدمة من المستخدم فقط.',
    'summary.patientLocation': 'موقع المريض',
    'waiting.title': 'بينما المساعدة في الطريق',
    'waiting.subtitle': 'إليك بعض الأشياء التي يمكنك فعلها أثناء الانتظار',
    'waiting.stayCalmTitle': 'ابقَ هادئًا',
    'waiting.stayCalmDesc': 'تنفس ببطء وعمق. هدوؤك يساعد المريض.',
    'waiting.keepStillTitle': 'أبقِ المريض ثابتًا',
    'waiting.keepStillDesc': 'ما لم يكن هناك خطر فوري، تجنب تحريك المريض.',
    'waiting.followTitle': 'اتبع التعليمات',
    'waiting.followDesc': 'إذا اتصلت بخدمات الطوارئ، اتبع إرشاداتهم.',
    'waiting.notice': 'هذا التوجيه عام بطبيعته. اتبع دائمًا التعليمات المحددة من مشغلي خدمات الطوارئ عند توفرها.',
    'waiting.startOver': 'ابدأ من جديد',
    'footer.disclaimer': 'هام: هذه الأداة لا تقدم تشخيصًا أو نصيحة طبية. صُممت للمساعدة في تنظيم المعلومات للمستجيبين للطوارئ. اتصل دائمًا بخدمات الطوارئ مباشرة في المواقف التي تهدد الحياة.',
    'footer.copyright': 'مساعد فرز الطوارئ • نموذج MVP',
    'a11y.urgencyAnnouncement': 'اكتمل التقييم. مستوى الإلحاح:',
    'a11y.skipToMain': 'انتقل إلى المحتوى الرئيسي',
    'a11y.progressAnnouncement': 'سؤال {current} من {total}',
  },
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
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || translations['en'][key] || key;
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, String(value));
      });
    }
    return text;
  };

  const currentLang = languages.find(l => l.code === language);
  const emergencyNumber = currentLang?.emergencyNumber || '911';
  const isRTL = language === 'ar';

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
