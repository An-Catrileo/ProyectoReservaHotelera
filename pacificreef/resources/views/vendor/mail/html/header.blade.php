@props(['url'])
<tr>
  <td class="header">
    <a href="{{ $url }}" style="display: inline-block;">
      @if (trim($slot) === 'Laravel')
      <img src="https://laravel.com/img/notification-logo.png" class="logo" alt="Laravel Logo">
      @elseif (trim($slot) === 'Grand Oasis Resort' || trim($slot) === config('app.name'))
      <div style="background: linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%); padding: 20px 40px; border-radius: 8px; text-align: center;">
        <div style="font-size: 28px; font-weight: bold; color: #FFFFFF; letter-spacing: 1px; margin-bottom: 5px;">Grand Oasis Resort</div>
        <div style="font-size: 12px; color: #BAE6FD; letter-spacing: 3px;">HOTEL & SPA</div>
      </div>
      @else
      {{ $slot }}
      @endif
    </a>
  </td>
</tr>