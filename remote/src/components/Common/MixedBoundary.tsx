import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

import { Error, Loading } from 'components/Common';

interface Props {
  children: React.ReactNode;
  css?: React.CSSProperties;
  errFallback?: React.ReactElement<React.FunctionComponent>;
  susFallback?: React.ReactNode;
  resetKeys?: Array<unknown>;
  onResetKeysChange?: (
    prevResetKeys: Array<unknown> | undefined,
    resetKeys: Array<unknown> | undefined,
  ) => void;
  onReset?: (...args: Array<unknown>) => void;
  onError?: (error: Error, info: { componentStack: string }) => void;
}

export default function MixedBoundary({
  children,
  css,
  errFallback,
  susFallback,
  ...restErrorBoundaryAttributes
}: Props) {
  return (
    <ErrorBoundary
      fallback={errFallback ? errFallback : <Error css={css} />}
      {...restErrorBoundaryAttributes}
    >
      <Suspense fallback={susFallback ? susFallback : <Loading css={css} />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
