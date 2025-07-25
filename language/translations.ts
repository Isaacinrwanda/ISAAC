
export const translations = {
  rw: {
    cover: {
      title: "ISAAC",
      button: "Tangira",
    },
    setup: {
      title: "Umutoza w'Ikiganiro cya AI",
      subtitle: "Uzuza amakuru kugirango AI ibashe gutangira ikiganiro.",
      form: {
        companyLabel: "Izina ry’Ikigo",
        companyPlaceholder: "urugero: Google, Arise AI Agency",
        roleLabel: "Umwanya w’akazi ushakwa",
        rolePlaceholder: "urugero: Software Engineer",
        error: "Nyamuneka uzuza ibisabwa byose.",
        button: "Tangira Ikiganiro",
        buttonLoading: "Utegure...",
      },
    },
    chat: {
      title: "Ikiganiro cy'Akazi",
      backButton: "Subira inyuma",
      endButton: "Soza Ikiganiro",
      inputPlaceholder: "Andika igisubizo cyawe...",
    },
    feedback: {
      title: "Raporo y'Isubiza",
      overall: "Isesengura Rusange",
      strengths: "Imbaraga Zagaragaye",
      improvements: "Aho Wakwitaho kurushaho",
      restartButton: "Ongera Ugerageze",
      scoreTitle: "Amanota y'Ikiganiro",
      rationale: "Ibisobanuro by'Amanota",
    },
    error: {
        title: "Habaye Ikibazo",
        start: "Habayeho ikibazo mu gutangiza ikiganiro. Nyamuneka gerageza ongera.",
        sendMessage: "Habayeho ikibazo mu kohereza ubutumwa. Nyamuneka gerageza ongera.",
        end: "Habayeho ikibazo mu gusoza ikiganiro. Nyamuneka gerageza ongera.",
        restartButton: "Subira Intangiriro",
    }
  },
  en: {
    cover: {
      title: "ISAAC",
      button: "Start",
    },
    setup: {
      title: "AI Interview Coach",
      subtitle: "Fill in the details for the AI to start the interview.",
      form: {
        companyLabel: "Company Name",
        companyPlaceholder: "e.g., Google, Arise AI Agency",
        roleLabel: "Job Role",
        rolePlaceholder: "e.g., Software Engineer",
        error: "Please fill in all fields.",
        button: "Start Interview",
        buttonLoading: "Preparing...",
      },
    },
    chat: {
      title: "Job Interview",
      backButton: "Back",
      endButton: "End Interview",
      inputPlaceholder: "Type your answer...",
    },
    feedback: {
      title: "Feedback Report",
      overall: "Overall Assessment",
      strengths: "Key Strengths",
      improvements: "Areas for Improvement",
      restartButton: "Try Again",
      scoreTitle: "Interview Score",
      rationale: "Score Rationale",
    },
    error: {
        title: "An Error Occurred",
        start: "An error occurred while starting the interview. Please try again.",
        sendMessage: "An error occurred while sending the message. Please try again.",
        end: "An error occurred while ending the interview. Please try again.",
        restartButton: "Back to Start",
    }
  },
};

export type TranslationKey = keyof typeof translations.en;
