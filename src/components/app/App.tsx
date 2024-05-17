import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from 'src/styles/index.module.scss';
import { ArticleParamsForm } from 'components/article-params-form';
import { Article } from 'components/article';

export const App = () => {
	const [selectedStyles, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': selectedStyles.fontFamilyOption.value,
					'--font-size': selectedStyles.fontSizeOption.value,
					'--font-color': selectedStyles.fontColor.value,
					'--container-width': selectedStyles.contentWidth.value,
					'--bg-color': selectedStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm state={selectedStyles} setState={setArticleState} />
			<Article />
		</main>
	);
};
