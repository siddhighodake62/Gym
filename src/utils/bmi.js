/**
 * Calculate BMI from weight (kg) and height (cm)
 */
export const calculateBMI = (weight, height) => {
  const heightM = height / 100;
  return parseFloat((weight / (heightM * heightM)).toFixed(1));
};

/**
 * Get BMI category and health info
 */
export const getBMICategory = (bmi) => {
  if (bmi < 18.5) {
    return {
      category: 'Underweight',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500',
      description: 'You are below the healthy weight range.',
      suggestions: [
        'Increase caloric intake with nutrient-dense foods',
        'Focus on strength training to build muscle mass',
        'Consult a nutritionist for a personalized meal plan',
        'Include healthy fats like avocados, nuts, and olive oil',
        'Eat frequent smaller meals throughout the day',
      ],
      risk: 'Low to Moderate',
    };
  } else if (bmi < 25) {
    return {
      category: 'Normal Weight',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500',
      description: 'You are within the healthy weight range. Keep it up!',
      suggestions: [
        'Maintain your current balanced diet and exercise routine',
        'Aim for 150+ minutes of moderate exercise per week',
        'Focus on building strength and improving fitness performance',
        'Stay hydrated and prioritize sleep for recovery',
        'Regular health check-ups to maintain optimal health',
      ],
      risk: 'Low',
    };
  } else if (bmi < 30) {
    return {
      category: 'Overweight',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500',
      description: 'You are above the healthy weight range.',
      suggestions: [
        'Create a moderate caloric deficit (300–500 calories/day)',
        'Incorporate cardio 3–4 times per week',
        'Reduce processed foods and added sugars',
        'Increase protein intake to preserve muscle during weight loss',
        'Consider working with a personal trainer for guidance',
      ],
      risk: 'Moderate',
    };
  } else if (bmi < 35) {
    return {
      category: 'Obese (Class I)',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500',
      description: 'Your weight poses significant health risks.',
      suggestions: [
        'Consult with a healthcare professional immediately',
        'Start with low-impact exercise like swimming or walking',
        'Work with a registered dietitian on a structured meal plan',
        'Set realistic short-term goals (1–2 lbs/week loss)',
        'Monitor blood pressure, blood sugar, and cholesterol regularly',
      ],
      risk: 'High',
    };
  } else {
    return {
      category: 'Obese (Class II+)',
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500',
      description: 'Your weight poses very serious health risks.',
      suggestions: [
        'Seek immediate medical consultation',
        'Consider medically supervised weight loss program',
        'Start very gentle activity under medical supervision',
        'Address any underlying medical conditions',
        'Build a support system for long-term lifestyle changes',
      ],
      risk: 'Very High',
    };
  }
};

export const getBMIColor = (bmi) => {
  if (bmi < 18.5) return '#60A5FA';
  if (bmi < 25) return '#34D399';
  if (bmi < 30) return '#FBBF24';
  if (bmi < 35) return '#F97316';
  return '#EF4444';
};

export const getIdealWeight = (height, gender = 'male') => {
  const heightCm = parseFloat(height);
  if (gender === 'male') {
    return parseFloat((50 + 2.3 * ((heightCm / 2.54) - 60)).toFixed(1));
  } else {
    return parseFloat((45.5 + 2.3 * ((heightCm / 2.54) - 60)).toFixed(1));
  }
};
