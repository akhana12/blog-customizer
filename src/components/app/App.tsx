import { CSSProperties, useState } from 'react';
import { defaultArticleState, OptionType } from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from 'src/styles/index.module.scss';
import { ArticleParamsForm } from 'components/article-params-form';
import { Article } from 'components/article';

export const App = () => {
	// Хуки для управления состояниями выбранных параметров стиля
	const [fontSelectState, setFontSelectState] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSizeSelectState, setFontSizeSelectState] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColorSelectState, setFontColorSelectState] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backgroundColorSelectState, setBackgroundColorSelectState] =
		useState<OptionType>(defaultArticleState.backgroundColor);
	const [contentWidthSelectState, setContentWidthSelectState] =
		useState<OptionType>(defaultArticleState.contentWidth);

	// Функция сброса всех параметров к значениям по умолчанию
	const setDefaultToAllSelections = () => {
		setFontSelectState(defaultArticleState.fontFamilyOption);
		setFontSizeSelectState(defaultArticleState.fontSizeOption);
		setFontColorSelectState(defaultArticleState.fontColor);
		setBackgroundColorSelectState(defaultArticleState.backgroundColor);
		setContentWidthSelectState(defaultArticleState.contentWidth);

		setSelectedStyles({
			fontFamily: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			backgroundColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
		});
	};

	// Хук для управления стилями выбранных параметров
	const [selectedStyles, setSelectedStyles] = useState({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});

	// Обработчик события отправки формы для установки выбранных стилей
	const handleFormSubmit = () => {
		setSelectedStyles({
			fontFamily: fontSelectState.value,
			fontSize: fontSizeSelectState.value,
			fontColor: fontColorSelectState.value,
			backgroundColor: backgroundColorSelectState.value,
			contentWidth: contentWidthSelectState.value,
		});
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': selectedStyles.fontFamily,
					'--font-size': selectedStyles.fontSize,
					'--font-color': selectedStyles.fontColor,
					'--container-width': selectedStyles.contentWidth,
					'--bg-color': selectedStyles.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm
				fontFamilyState={fontSelectState}
				setFontState={setFontSelectState}
				fontSizeState={fontSizeSelectState}
				setFontSizeState={setFontSizeSelectState}
				fontColorState={fontColorSelectState}
				setFontColorState={setFontColorSelectState}
				bgColorState={backgroundColorSelectState}
				setBgColorState={setBackgroundColorSelectState}
				contentWidthState={contentWidthSelectState}
				setContentWidthState={setContentWidthSelectState}
				onResetClick={setDefaultToAllSelections}
				onSubmitClick={handleFormSubmit}
			/>
			<Article />
		</div>
	);
};
