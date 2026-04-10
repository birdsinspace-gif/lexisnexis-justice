import Link from 'next/link';
import { ArrowLeft, AlertTriangle, Archive, Eye, FileText } from 'lucide-react';
import { getArchiveEntries } from '../../lib/grievance-archive';

export const metadata = {
  title: 'LexisNexis Justice | Public Archive',
  description: 'Anonymized grievance archive from current and former LexisNexis Risk Solutions employees.',
};

export default async function ArchivePage() {
  const entries = await getArchiveEntries();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#450a0a,transparent_35%),linear-gradient(180deg,#09090b_0%,#000_100%)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
              <Archive className="h-4 w-4" />
              Public Archive
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">Anonymized employee grievances</h1>
            <p className="mt-4 max-w-3xl text-base text-zinc-400 md:text-lg">
              These stories are pulled from the public grievance archive. Private identifying information stays out of view. What remains is the pattern.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-red-400/40 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to landing page
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm uppercase tracking-[0.2em] text-zinc-500">Stories loaded</div>
            <div className="mt-3 text-4xl font-bold text-white">{entries.length}</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm uppercase tracking-[0.2em] text-zinc-500">Visibility</div>
            <div className="mt-3 flex items-center gap-3 text-lg font-semibold text-emerald-300">
              <Eye className="h-5 w-5" />
              Public but anonymized
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm uppercase tracking-[0.2em] text-zinc-500">Source</div>
            <div className="mt-3 flex items-center gap-3 text-lg font-semibold text-red-300">
              <FileText className="h-5 w-5" />
              Published Google Sheet feed
            </div>
          </div>
        </div>

        {entries.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-amber-400/20 bg-amber-500/10 p-8 text-amber-100">
            <div className="flex items-center gap-3 text-xl font-semibold">
              <AlertTriangle className="h-6 w-6" />
              Archive not connected yet
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-amber-50/80">
              Set `PUBLIC_GRIEVANCE_ARCHIVE_CSV_URL` to the published CSV link for your public Google Sheet and this page will begin rendering anonymized grievances automatically.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6">
            {entries.map((entry, index) => (
              <article key={`${entry.publicName}-${entry.submittedAt}-${index}`} className="rounded-[2rem] border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-black/20">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-red-300">{entry.publicName}</div>
                    <h2 className="mt-3 text-2xl font-semibold text-white">{entry.position || 'Employee submission'}</h2>
                    <p className="mt-2 text-sm text-zinc-500">
                      {entry.employmentStatus || 'Status undisclosed'}
                      {entry.employmentStart || entry.employmentEnd ? ` • ${entry.employmentStart || 'Unknown start'} to ${entry.employmentEnd || 'Present'}` : ''}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-400">
                    {entry.submittedAt ? new Date(entry.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Undated'}
                  </div>
                </div>

                <p className="mt-6 whitespace-pre-wrap text-lg leading-8 text-zinc-200">{entry.grievance || 'No public story text available.'}</p>

                {entry.criminalActivity ? (
                  <div className="mt-6 rounded-3xl border border-red-500/20 bg-red-500/10 p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
                      <AlertTriangle className="h-4 w-4" />
                      Potential criminal activity flagged
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-zinc-200">{entry.criminalActivity}</p>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
